<script>
import DataView from "primevue/dataview";
import axios from "axios";
import { PrimeIcons } from "primevue/api";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      pets: [],
      errors: [],
    };
  },
  components: {
    DataView,
  },
  computed: {
    ...mapGetters({
      current_user: "user",
    }),
  },
  mounted() {
    const that = this;
    axios
      .post("http://127.0.0.1:8000/pets", { user_id: that.current_user.id })
      .then((response) => {
        if (response.data) {
          this.pets = response.data;
        } else {
          that.errors.push("Something went wrong");
        }
      })
      .catch(function (error) {
        that.errors.push("Something went wrong");
      });
  },
  methods: {
    goToProfile() {
      this.$router.push("pet-new/pet");
    },
  },
};
</script>

<template>
  <div>
    <DataView :value="pets" layout="list" class="lg:w-6 sm:w-full m-auto">
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Button
              icon="pi pi-plus"
              class="p-button-rounded p-button-primary p-button-outlined"
              @click="goToProfile()"
            />
          </div>
        </div>
      </template>
      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <img :src="slotProps.data.pic" :alt="slotProps.data.name" />
            <div class="product-list-detail">
              <div class="product-name">
                {{ slotProps.data.name }}
                <span class="product-price"
                  ><i
                    class="pi pi-heart-fill m-l-6"
                    style="font-size: 1.5rem"
                  ></i
                  >{{ slotProps.data.likes_count }}</span
                >
              </div>
              <div class="product-description">
                {{ slotProps.data.owner_name }}
              </div>
              <i class="pi pi-tag product-category-icon"></i
              ><span class="product-category">{{ slotProps.data.type }}</span>
            </div>
            <div class="product-list-action">
              <Button label="Edit" icon="pi pi-pencil" iconPos="right" />
              <Button
                label="Delete"
                icon="pi pi-trash"
                iconPos="right"
                class="p-button-danger"
              />
            </div>
          </div>
        </div>
      </template>
      <template #empty>No records found.</template>
    </DataView>
  </div>
</template>



<style lang="scss" scoped>
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

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
