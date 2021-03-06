import colors from 'vuetify/es5/util/colors'
const axios = require("axios")
require('dotenv').config()
const serviceId = process.env.NUXT_ENV_SERVICE_ID
const apiKey = process.env.NUXT_ENV_API_KEY
const siteName = process.env.NUXT_ENV_SITE_NAME
const siteUrl = process.env.NUXT_ENV_SITE_URL
const siteDesc = process.env.NUXT_ENV_SITE_DESC
const siteKeywords = process.env.NUXT_ENV_SITE_KEYWORDS

export default {
    env: {
        serviceId: serviceId,
        apiKey: apiKey,
        siteName: siteName,
        topTitle: process.env.NUXT_ENV_TOP_TITLE,
        topTemplate: process.env.NUXT_ENV_TOP_TEMPLATE,
        colorSectionBg: process.env.NUXT_ENV_COLOR_SECTION_BG,
        colorItemBg: process.env.NUXT_ENV_COLOR_ITEM_BG,
        colorBtnBg: process.env.NUXT_ENV_COLOR_BTN_BG,
        colorBtnTxt: process.env.NUXT_ENV_COLOR_BTN_TXT,
        colorContactInput: process.env.NUXT_ENV_COLOR_CONTACT_INPUT,
        colorContactBtn: process.env.NUXT_ENV_COLOR_CONTACT_BTN,
        colorMenuBg: process.env.NUXT_ENV_COLOR_MENU_BG,
        colorListBg: process.env.NUXT_ENV_COLOR_LIST_BG,
        colorListTitle: process.env.NUXT_ENV_COLOR_LIST_TITLE,
        colorListDate: process.env.NUXT_ENV_COLOR_LIST_DATE,
        colorListOverview: process.env.NUXT_ENV_COLOR_LIST_OVERVIEW,
        colorBread:  process.env.NUXT_ENV_COLOR_BREAD,
        contactSelections: process.env.NUXT_ENV_CONTACT_SELECTIONS,
        contactComboLabel: process.env.NUXT_ENV_CONTACT_COMBO_LABEL,
        contactComboItems: process.env.NUXT_ENV_CONTACT_COMBO_ITEMS,
        contactCorporateLabel: process.env.NUXT_ENV_CONTACT_CORPORATE_LABEL,
        contactNameLabel: process.env.NUXT_ENV_CONTACT_NAME_LABEL,
        contactEmailLabel: process.env.NUXT_ENV_CONTACT_EMAIL_LABEL,
        contactContentLabel: process.env.NUXT_ENV_CONTACT_CONTENT_LABEL,
        bread: process.env.NUXT_ENV_BREAD
    },
    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    mode: 'universal',
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'static',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        htmlAttrs: {
            prefix: 'og: http://ogp.me/ns#',
            lang: 'ja'
        },
        titleTemplate: `%s - ${siteName}`,
        meta: [
            // 設定関連
            { charset: 'utf-8' },
            { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          
            // SEO関連
            { hid: 'description', name: 'description', content: siteDesc },
            { hid: 'keywords', name: 'keywords', content: siteKeywords },
            
            // ogp関連
            { hid: 'og:site_name', property: 'og:site_name', content: siteName },
            { hid: 'og:type', property: 'og:type', content: 'website' },
            { hid: 'og:url', property: 'og:url', content: siteUrl },
            { hid: 'og:title', property: 'og:title', content: siteName },
            { hid: 'og:description', property: 'og:description', content: siteDesc },
            { hid: 'og:image', property: 'og:image', content: `${siteUrl}ogp/home.jpg` },
            { name: 'twitter:card', content: 'summary_large_image' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Global CSS
    */
    css: [
        '~~/font/dist/css/materialdesignicons.css'
    ],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        '~plugins/day.js'
    ],
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,
    /*
     ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/dotenv',
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        defaultAssets: false,
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {
    },
    generate: {
        routes: async function () {
            var layout = await axios.get(`https://${serviceId}.microcms.io/api/v1/layout/layout`, {
                headers: { 'X-API-KEY': apiKey }
            })
            var menus = await axios.get(`https://${serviceId}.microcms.io/api/v1/menu`, {
                headers: { 'X-API-KEY': apiKey }
            })
            var sections = await axios.get(`https://${serviceId}.microcms.io/api/v1/section`, {
                headers: { 'X-API-KEY': apiKey }
            })
            var routes = []
            layout = layout.data
            menus = menus.data.contents
            var header = menus.filter(x => x.header)
            var footer = menus.filter(x => x.footer)
            sections = sections.data.contents
            var homeSections = layout.layout
            layout = {
                header: {
                    title: (layout.title)? layout.title: '',
                    logo: (layout.logo)? layout.logo : {url: ''},
                    bgColor: (layout.bgColorH)? layout.bgColorH : 'blue',
                    txtColor: (layout.txtColorH)? layout.txtColorH : 'white'
                },
                footer: {
                    copyright: layout.copyright,
                    bgColor: (layout.bgColorF)? layout.bgColorF : 'blue',
                    txtColor: (layout.txtColorF)? layout.txtColorF : 'white'
                }
            }
            var listSections = []
            var listsSections = []
            menus.forEach(y => {
                listSections = sections.filter(z => {
                    if (z.menu) {
                        if (z.menu.id == y.id) {
                            return true
                        }
                    }
                })
                if (y.list != null) {
                    if (y.list.num) {
                        listSections = listSections.filter((w,i) => i < y.list.num)
                    }
                }
                listsSections = {...listsSections, [y.id]: listSections}
            })
            routes = [
                {
                    route: '/',
                    payload: {
                        homeSections,
                        listsSections,
                        menus: {header, footer},
                        layout
                    }
                }
            ]
            
            menus.forEach(p => {
                routes = [
                    ...routes,
                    {
                        route: `/${p.id}`,
                        payload: {
                            menu: p,
                            sections: listsSections[p.id],
                            menus: {header, footer},
                            layout
                        }
                    }
                ]
            })
            
            sections.forEach(q => {
                if (q.menu) {
                    routes = [
                        ...routes,
                        {
                            route: `/${q.menu.id}/${q.id}`,
                            payload: {
                                section: q,
                                menus: {header, footer},
                                layout
                            }
                        }
                    ]
                }
            })
            
            return routes
        }
    }
}