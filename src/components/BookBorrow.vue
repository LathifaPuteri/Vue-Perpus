<template>
    <main>
        <div class="container-fluid px-4">
            <h2 class="mt-4">Borrowing</h2>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
                <li class="breadcrumb-item active">Borrowing</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    Borrowing List

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#borrowing_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Borrowing</button>
                </div>
                <div class="card-body">
                    <table id="student_table" class="table table-responsive table-striped table-hover">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>STUDENT NAME</th>
                                <th>CLASS</th>
                                <th>BORROW DATE</th>
                                <th>RETURN DATE</th>
                                <!-- <th>STATUS</th> -->
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>NO</th>
                                <th>STUDENT NAME</th>
                                <th>CLASS</th>
                                <th>BORROW DATE</th>
                                <th>RETURN DATE</th>
                                <!-- <th>STATUS</th> -->
                                <th>ACTION</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="(ls, index) in list_transaction" :key="ls">
                                <td>{{ index+1 }}</td>
                                <td>{{ ls.student_name }}</td>
                                <td><span class="badge bg-dark" >{{ ls.class_name + ' - '+ ls.group }}</span></td>
                                <td>{{ ls.date_of_borrowing }}</td>
                                <td>{{ ls.date_of_returning }}</td>
                                <!-- <td>
                                    <span class="badge bg-success" v-if="statusCheck(ls.date_of_returning)">On Progress</span>
                                    <span class="badge bg-danger" v-else>Late</span>
                                </td> -->
                                <td>
                                    <button class="btn btn-sm btn-info" @click="Detail(ls)" data-bs-toggle="modal" data-bs-target="#borrowing_detail_modal" ><i class="fas fa-list fa-fw"></i></button>&nbsp;
                                    <button class="btn btn-sm btn-success" @click="Return(ls.id_student)" data-bs-toggle="modal" data-bs-target="#borrowing_modal"><i class="fas fa-check fa-fw"></i></button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="borrowing_detail_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Borrowing Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-responsive table-stripped">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>COVER</th>
                                    <th>BOOK NAME</th>
                                    <th>AUTHOR</th>
                                </tr>
                            </thead>
 
                            <tbody>
                                <tr v-for="(detail, index) in list_detail_transaction" :key="detail">
                                    <td>{{index+1}}</td>
                                    <td>
                                        <img v-if="detail.book.image !== null" :src="api_url + '/images/' + detail.book.image" width="150">
                                        <span v-else>No Image</span>
                                    </td>
                                    <td>{{ detail.book.book_name }}</td>
                                    <td>{{ detail.book.author }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="borrowing_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Borrowing Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="card">
                                    <div class="card-body">
                                         <div class="mb-3">
                                            <div class="form-group">
                                                <label for="id_student" class="form-label">Student Name</label>
                                                <select class="form-control" v-model="id_student">
                                                    <option value="" disabled>-- Choose Student --</option>
                                                    <option v-for="ls in list_student" :key="ls.id_student" :value="ls.id_student">{{ ls.student_name }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="date_of_borrowing" class="form-label">Date of Borrowing</label>
                                            <input type="date" class="form-control" id="date_of_borrowing" v-model="date_of_borrowing" placeholder="Date of Borrowing">
                                        </div>
                                        <div class="mb-3">
                                            <label for="date_of_returning" class="form-label">Date of Returning</label>
                                            <input type="date" class="form-control" id="date_of_returning" v-model="date_of_returning" placeholder="Date of Returning">
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                            <div class="col-md-9">
                                <div class="card">
                                    <div class="card-body">
                                        <button @click="addItem" class="btn btn-sm btn-primary text-white"><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah Item</button>
                                        <br><br>
                                        <div class="row" v-for="(detail, counter) in transaction_detail" :key="counter">
                                            <br><br>
                                            <div class="col-md-8">
                                                <div class="form-group">
                                                    <select class="form-control" v-model="detail.id_book">
                                                        <option value="" disabled>-- Choose Book --</option>
                                                        <option v-for="lb in list_book" :key="lb.id_book" :value="lb.id_book">{{ lb.book_name }} - {{ lb.author }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <input class="form-control" placeholder="Qty" type="number" v-model="detail.qty"> 
                                                </div>
                                            </div>
                                            <div class="col-md-1">
                                                <button class="btn btn-danger btn-sm" @click="deleteItem(counter)"> - </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button @click="Save()" class="btn btn-block btn-lg btn-success">SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>
<script>
module.exports = {
    data : function(){
        return {
            id_student: "",
            date_of_borrowing: "",
            date_of_returning: "",
            list_transaction: [],
            list_detail_transaction: [],
            //for transaction form
            list_book: [],
            list_student: [],
            transaction_detail: [],
        }
    },
    methods: {
        addItem(){
            this.transaction_detail.push({
                id_book: '',
                qty: '',
            })
        },
        deleteItem(counter){
            this.transaction_detail.splice(counter,1);
        },
        getBook: function(){
            //ambil data buku untuk dropdown
            let token = {
                headers : { 
                    "Authorization" : "Bearer " + this.$cookies.get("Authorization")
                }
            }
            axios.get(base_url + "/Book", token)
            .then(response => {
                this.list_book = response.data;
            })
        },
        getStudent: function(){
            //ambil data student untuk dropdown
            let token = {
                headers : { 
                    "Authorization" : "Bearer " + this.$cookies.get("Authorization")
                }
            }
            axios.get(base_url + "/Students", token)
            .then(response => {
                this.list_student = response.data;
            })
        },
        getData: function(){
            let token = {
                headers : { 
                    "Authorization" : "Bearer " + this.$cookies.get("Authorization")
                }
            }
            axios.get(base_url + "/BookBorrow", token)
            .then( response => {
                console.log(response.data)
                this.list_transaction = response.data;
            })
        },
        // statusCheck: function(date_of_returning){
        //     const status = moment().isBefore(moment(date_of_returning))
        //     if(status){
        //         return true
        //     } else {
        //         return false
        //     }
        // },
        Add: function() {
            this.id_student = ""
            this.date_of_borrowing = ""
            this.date_of_returning = ""

            this.getBook()
            this.getStudent()
        },
        Detail: function(data) {
            this.id_student = data.id_student
            this.date_of_borrowing = data.date_of_borrowing
            this.date_of_returning = data.date_of_returning
            //get detail
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }
            axios.get(base_url + "/BookBorrowDetails/" + data.id_book_borrow, token)
            .then( response => {
                this.list_detail_transaction = response.data
            })
        },
        Save: function() {
            let token = {
                headers : { 
                    "Authorization" : "Bearer " + this.$cookies.get("Authorization")
                }
            }
            
            let form = {
                "id_student": this.id_student,
                "date_of_borrowing": this.date_of_borrowing,
                "date_of_returning": this.date_of_returning,
                "detail": this.transaction_detail
            }
            axios.post(base_url + '/BookBorrow', form, token)
            .then( response => {
                Swal.fire({
                    title: 'Success!',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            })
            this.getData()
        },
    },
    mounted(){
        this.getData()
    },
}
</script>