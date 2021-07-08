<template>
    <div class="container is-fullhd docs-template-horizontal">
        <div class="columns">
            <div class="column">
                <div class="level-left">
                    <h1 class="title">All Rates</h1>
                </div>
            </div>
            <div class="column">
                <b-field>
                    <b-input placeholder="Filter" v-model="search_query" />
                </b-field>
            </div>
        </div>
        <section>
            <b-table
                :data="filter"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :default-sort-direction="defaultSortDirection"
                :sort-icon="sortIcon"
                :sort-icon-size="sortIconSize"
                default-sort="name"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">

                <b-table-column field="name" label="NAME" width="30%" sortable v-slot="props">
                    {{ props.row.name }} 
                </b-table-column>

                <b-table-column field="symbol" label="SYMBOL" width="30%" sortable v-slot="props">
                    {{ props.row.symbol }}
                </b-table-column>

                <b-table-column field="sellRate" label="SELL" width="20%" sortable numeric v-slot="props">
                    {{ formatPrice(props.row.sellRate) }}
                </b-table-column>

                <b-table-column field="rate" label="BUY" width="20%" sortable numeric v-slot="props">
                    {{ formatPrice(props.row.rate) }}
                </b-table-column>

                <b-table-column label="">
                </b-table-column>
            </b-table>
        </section>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'App',
        data() {
          return {
              data:[],
              isPaginated: true,
              isPaginationRounded: true,
              searchTable: true,
              paginationPosition: 'bottom',
              defaultSortDirection: 'asc',
              sortIcon: 'arrow-up',
              sortIconSize: 'is-small',
              currentPage: 1,
              perPage: 10,
              search_query: '',
          }
        },
        created: function(){
            this.getRates();
        },
        computed: {
            reversedMessage: function () {
                console.log(this.querySearch);
                return this.querySearch;
            },
            filter: function() {
                var name_re = new RegExp(this.search_query, 'i')
                var data = []
                for (let i in this.data) {
                    if (this.data[i].name.match(name_re)
                        || this.data[i].symbol.match(name_re)) {
                        data.push(this.data[i])
                    }
                }
                return data
            }
        },
        methods: {
            getRates(){
                axios.get('https://r.easycrypto.nz/json/backenddb.json')
                    .then(response => {
                        this.data = Object.keys(response.data).map((key) => {
                            return response.data[key];
                        })
                    })
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
        }
    }
</script>
