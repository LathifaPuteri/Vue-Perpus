//base url API
var base_url = "http://localhost:8000/api";
var api_url = "http://localhost:8000"

//konfigurasi route
var router = [
    {
        path: "/",
        name: "Home",
        component: httpVueLoader("./src/components/Home.vue")
    },
    {
        path: "/book",
        name: "Book",
        component: httpVueLoader("./src/components/Book.vue")
    },
    {
        path: "/student",
        name: "Student",
        component: httpVueLoader("./src/components/Student.vue")
    },
    {
        path: "/grade",
        name: "Grade",
        component: httpVueLoader("./src/components/Grade.vue")
    },
    {
        path: "/book_borrow",
        name: "BookBorrow",
        component: httpVueLoader("./src/components/BookBorrow.vue")
    },
];

var routers = new VueRouter({ routes: router, base:"/"});

//instance vue
var app = new Vue({
    el: "#app", //element yangg di vue kan
    components : {
        "login": httpVueLoader("./src/components/Login.vue"),
        "apps" : httpVueLoader("./src/components/App.vue")
    },
    data: { //state /variabel global
        user: {
            id_user: "",
            role: "",
            name: "",
            username: "",
        },
        componentName: "",
    },
    router: routers,
    methods: {
        CekToken: function(){
            //cek cookies, apakah sudah punya token?
            if(this.$cookies.isKey('Authorization')){
                //validasi token dulu
                //mapping header token
                let config = {
                    headers : {
                        "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                    }
                }
                
                try {
                    axios.get(base_url + '/login_check', config).then (response => {
                    
                        if(response.data.status === 1){
                            //load component apps
                            this.componentName = 'apps';
    
                            this.id_user  = response.data.data.id;
                            this.role  = response.data.data.role;
                            this.name  = response.data.data.name;
                            this.username  = response.data.data.username;
                        } else {
                            this.componentName = "login";
                        }
                    })
                } catch (error) {
                    this.componentName = "login";
                }
                
            }else{ //kalau tidak punya, langsung ke login
                this.componentName = "login";
            }
        }
    },
    mounted(){
        this.CekToken();
    }


});