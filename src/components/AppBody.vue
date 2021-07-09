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
                    <b-input placeholder="Filter" type="search" icon="search" v-model="search_query" />
                </b-field>
            </div>
        </div>
        <section>
            <b-table
                :data="filter"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :sort-icon="sortIcon"
                :sort-icon-size="sortIconSize"
                :hoverable="isHoverable"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
                hasMobileCards: true
                >

                <b-table-column field="name" label="NAME" width="30%" sortable v-slot="props">
                    <div class="level-left">
                        {{ props.row.name }}&nbsp; 
                        <b-tooltip multilined type="is-light" position="is-left">
                            <b-icon icon="info-circle" type="is-light"></b-icon>
                            <template v-slot:content>
                                <p><b><b-icon icon="globe-asia"></b-icon> Website</b></p>
                                {{ props.row.website }}
                                <p><b><b-icon icon="wallet"></b-icon> Wallet</b></p>
                                {{ props.row.wallet }}
                            </template>
                        </b-tooltip>
                    </div>
                </b-table-column>

                <b-table-column field="symbol" label="SYMBOL" width="30%" sortable v-slot="props">
                    <div class="level-left">
                        {{ props.row.symbol }}
                    </div>
                </b-table-column>

                <b-table-column field="sellRate" label="SELL" width="20%" sortable numeric v-slot="props">
                    {{ formatPrice(props.row.sellRate) }}
                </b-table-column>

                <b-table-column field="rate" label="BUY" width="20%" sortable numeric v-slot="props">
                    {{ formatPrice(props.row.rate) }}
                </b-table-column>

                <b-table-column label="" v-slot="props">
                    <b-button size="is-small" @click="starlist(props.index)" :type="props.row.star ? 'is-primary' : 'is-light'" :id="'button_'+props.index" >
                        <b-icon icon="star" :type="props.row.star ? 'is-light' : 'is_dark'" :id="'star_'+props.index"></b-icon>
                    </b-button>
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
              paginationPosition: 'bottom',
              sortIcon: 'arrow-up',
              sortIconSize: 'is-small',
              currentPage: 1,
              perPage: 30,
              isHoverable: true,
              search_query: '',
              isType: 'is-light',
          }
        },
        created: function() {
            this.getRates();
        },
        computed: {
            filter: function() {
                var name_re = new RegExp(this.search_query, 'i');
                var data = [];
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
                    });
            },
            whiteSpace(txt) {
                return txt.replace(/ /g,'');
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            starlist(index){
                let first = this.data[0];
                let toMove = this.data[index];

                this.data[index]['star'] = true;

                this.data.splice(index, 1);
                this.data.splice(0, 1, toMove,first);
            },
        }
    }
</script>
