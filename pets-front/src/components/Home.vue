<script>
import DataView from "primevue/dataview";
import axios from "axios";
import { PrimeIcons } from "primevue/api";
import Errors from "./Errors.vue";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";

export default {
  data() {
    return {
      numPerPage: 10,
      type: null,
      petName: null,
      types: ["dog", "cat", "reptile", "hamster", "parrot"],
    };
  },
  computed: {
    pets() {
      return this.$store.state.pets;
    },
    user() {
      return this.$store.state.id;
    },
  },
  components: {
    DataView,
    Errors,
    Button,
    Dropdown,
    InputText
  },
  mounted() {
    this.$store.dispatch("getPets", {num: this.numPerPage});
  },
  methods: {
    onPage(event) {
      this.$store.dispatch("getPets", { skip: event.first, num:this.numPerPage, type: this.type, petName: this.petName });
    },
    goToDetails(id) {
      this.$router.push({ name: "Details", params: { id: id } });
    },
    likeClick(id) {
      const p = this.pets.list.find((item) => {
        return item.id == id;
      });
      if (p && this.user && !p.liked_by_user) {
        this.$store.dispatch("like", id);
        this.$store.commit("increaseLike", id);
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="grid w-full justify-content-center flex">
      <Errors></Errors>
    </div>
    <DataView
      :value="pets.list"
      :totalRecords="pets.total"
      layout="grid"
      class="ml-3 mr-3"
      :paginator="true"
      :rows="numPerPage"
      :lazy="true"
      @page="onPage($event)"
    >
      <template #header>
        
          <div class="grid grid-nogutter">
                    <div class="mr-2" style="text-align: left; ">
                        <Dropdown v-model="type" :options="types" inputId="typesSelector"  placeholder="Filter By type" @change="onPage({first:0})"/>
                    </div>
                       <div class="" style="text-align: left">
                        <InputText
                id="petName"
                type="text"
                placeholder="Filter by pet name"
                class="w-full"
                v-model="petName"
                @change="onPage({first:0})"
              />
                       
                    </div>
                </div>
 
         </template>
      <template #grid="slotProps">
        <div class="col-12 md:col-3 xl:col-2">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-tag product-category-icon"></i>
                <span class="product-category">{{ slotProps.data.type }}</span>
              </div>
            </div>
            <div class="product-grid-item-content">
              <img
                :src="slotProps.data.pic"
                :alt="slotProps.data.name"
                width="200"
                height="200"
              />
              <div class="product-name">{{ slotProps.data.name }}</div>
            </div>
            <div class="product-grid-item-bottom grid flex-row mt-3">
              <div class="col">
                <Button
                  label="Details"
                  class="
                    p-button
                    p-component
                    p-button-raised
                    p-button-info
                    p-button-text
                  "
                  @click="goToDetails(slotProps.data.id)"
                />
              </div>
              <div class="col flex align-content-end justify-content-end">
                <span
                  class="product-price"
                  @click="likeClick(slotProps.data.id)"
                  :class="{ liked: slotProps.data.liked_by_user }"
                  ><i class="pi pi-thumbs-up" style="font-size: 2rem"></i
                ></span>
                <span class="ml-2">{{ slotProps.data.likes_count }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>No records found.</template>
    </DataView>
  </div>
</template>



<style lang="scss" scoped>
.liked {
  color: var(--green-600);
}

.product-price:hover {
  cursor: pointer;
  color: var(--green-600);
}

.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 0.5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    align-self: flex-end;

    &:hover {
      cursor: pointer;
    }
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: 0.5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: 0.5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .product-grid-item-bottom {
    display: flex;
    flex-direction: column;
  }
  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
  }

  .product-grid-item-content {
    text-align: center;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
