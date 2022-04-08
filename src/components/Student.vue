<template>
    <div>
       <div class="container-fluid px-4">
            <h1 class="mt-4">Student</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">Student</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Student

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#student_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Student</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Id Student</th>
                                <th>Student Profile</th>
                                <th>Student Name</th>
                                <th>Date Of Birth</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Id Class</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ls in list_student" :key="ls">
                                <td>{{ ls.id_student }}</td>
                                <td><img :src="api_url + '/images/' + ls.image" width="150"></td>
                                <td>{{ ls.student_name }}</td>
                                <td>{{ ls.date_of_birth }}</td>
                                <td>{{ ls.gender }}</td>
                                <td>{{ ls.address }}</td>
                                <td>{{ ls.id_class }}</td>
                                <td>
                                    <button class="btn btn-warning" @click="Edit(ls)" data-bs-toggle="modal" data-bs-target="#studentprofile_modal" ><i class="fas fa-image fa-fw"></i></button>
                                    <button class="btn btn-info" @click="Edit(ls)" data-bs-toggle="modal" data-bs-target="#student_modal" ><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(ls.id_student)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="student_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Student Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="student_name" class="form-label">Student Name</label>
                            <input type="text" class="form-control" id="student_name" v-model="student_name" placeholder="Student Name">
                        </div>

                        <div class="mb-3">
                            <label for="date_of_birth" class="form-label">Date Of Birth</label>
                            <input type="date" class="form-control" id="date_of_birth" v-model="date_of_birth" placeholder="Date Of Birth">
                        </div>

                        <div class="mb-3">
                            <label for="gender" class="form-label">Gender</label>
                            <select name="gender" v-model="gender" class="form-control">
                                <option></option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <textarea class="form-control" id="address" v-model="address" rows="3"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="id_class" class="form-label">Class</label>
                            <select class="form-control" id="id_class" v-model="id_class">
                                <option v-for="cl in class_list" :key='cl' v-bind:value="cl.id_class">{{cl.class_name}} - {{cl.group}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="studentprofile_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Student Profile</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="student_profile" class="form-label">Student Profile</label>
                            <input type="file" class="form-control" id="student_profile" @change="UploadProfile($event)">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Upload(id_student)" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
module.exports = {
    //state
    data : function(){
        return {
            id_student:"",
            student_name:"",
            date_of_birth:"",
            gender:"",
            address:"",
            id_class:"",
            class_list: [],
            list_student: [],
        }
    },
    methods: {
        getData: function(){
            //mapping header token
            let token = {
            headers : {
              "Authorization" : "Bearer " + this.$cookies.get('Authorization')}
            }
            axios.get(base_url + "/Students" , token)
            .then( response => {
                this.list_student = response.data;
            })

             axios.get(base_url + "/Grade", token)
            .then(response => {
                this.class_list = response.data;
            })
        },
        Add: function() {
           this.id_student = ""
           this.student_name = ""
           this.date_of_birth = ""
           this.gender = ""
           this.address = ""
           this.id_class = ""
           this.action = "insert" 
        },
        Edit: function(ls){
            this.id_student=ls.id_student
            this.student_name=ls.student_name
            this.date_of_birth=ls.date_of_birth
            this.gender=ls.gender
            this.address=ls.address
            this.id_class=ls.id_class
            this.action="update"
        },
        UploadProfile: function(e){
            this.student_profile = e.target.files[0]
        },
    Upload: function(id){
            let token = {
                headers : { 
                    "Authorization" : "Bearer " + this.$cookies.get("Authorization"), 
                    'Content-Type' : 'multipart/form-data',
                }
            }

            let form  = new FormData()
            form.append("student_profile", this.student_profile)

            axios.post(base_url + '/Students/UploadProfile/'+ id, form, token)
            .then( response => {
                Swal.fire({
                    title: 'Success!',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'ok'
                })            

                this.getData()
            })

        },
        Save: function() {
            //mapping header token
            let token = {
                headers : { 
                    "Authorization" : "Bearer " + this.$cookies.get("Authorization")
                }
            }

            //mapping data
            let form  = {
                //backend       //state
                'student_name': this.student_name,
                'date_of_birth': this.date_of_birth,
                'gender': this.gender,
                'address': this.address,
                'id_class': this.id_class,
                'student_profile' : this.student_profile
            }

            if(this.action === 'insert'){ //POST

                axios.post(base_url + '/Students', form, token)
                .then( response => {
                   Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                })

            } else { //PUT
                axios.put(base_url + '/Students/' + this.id_student, form, token)
                .then( response => {
                    Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                })
            }

            this.getData()
        },
        Delete: function(id_student){
            //mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            Swal.fire({
                title: 'Delete Student Data',
                text: 'Are you sure you delete this data ?',
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
                denyButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {
                     axios.delete(base_url + '/Students/' + id_student, token)
                    .then( response => {

                        Swal.fire({
                            title: 'Success !',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'ok'
                        })

                        this.getData()
                    })

                    //Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire({
                        title: 'Cancel !',
                        text: 'Data is not deleted',
                        icon: 'error',
                        confirmButtonText: 'ok'
                    })
                }
            })

        }
    },
    mounted() {
        this.getData()
    },
}
</script>