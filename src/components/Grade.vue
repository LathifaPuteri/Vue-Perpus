<template>
    <div>
       <div class="container-fluid px-4">
            <h1 class="mt-4">Grade</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li class="breadcrumb-item active">Grade</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Class

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#class_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Class</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Id Class</th>
                                <th>Class Name</th>
                                <th>Group</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="lb in list_class" :key="lb">
                                <td>{{ lb.id_class }}</td>
                                <td>{{ lb.class_name }}</td>
                                <td>{{ lb.group }}</td>
                                <td>
                                    <button class="btn btn-info" @click="Edit(lb)" data-bs-toggle="modal" data-bs-target="#class_modal" ><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(lb.id_class)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="class_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Class Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="class_name" class="form-label">Class Name</label>
                            <input type="text" class="form-control" id="class_name" v-model="class_name" placeholder="Class Name">
                        </div>

                        <div class="mb-3">
                            <label for="group" class="form-label">Group</label>
                            <input type="text" class="form-control" id="group" v-model="group" placeholder="Group">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
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
            id_class:"",
            class_name:"",
            group:"",
            action:"",
            list_class: [],
         }
     },
    methods: {
        getData: function(){
            //mapping header token
            let config = {
            headers : {
              "Authorization" : "Bearer " + this.$cookies.get('Authorization')}
            }
            axios.get(base_url + "/Grade" , config)
            .then( response => {
                this.list_class = response.data;
            })
        },
        Add: function() {
           this.id_class = ""
           this.class_name = ""
           this.group= ""
           this.action = "insert" 
        },
        Edit: function(lb){
            this.id_class=lb.id_class
            this.class_name=lb.class_name
            this.group=lb.group
            this.action="update"
        },
    Save: function() {
            //mapping header token
            let config = {
                headers : { 
                    "Authorization" : "Bearer " + this.$cookies.get("Authorization")
                }
            }

            //mapping data
            let form  = {
                //backend       //state
                'class_name': this.class_name,
                'group': this.group
            }

            if(this.action === 'insert'){ //POST

                axios.post(base_url + '/Grade', form, config)
                .then( response => {
                   Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                })

            } else { //PUT
                axios.put(base_url + '/Grade/' + this.id_class, form, config)
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
    Delete: function(id_class){
            //mapping header token
            let config = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            Swal.fire({
                title: 'Delete Class Data',
                text: 'Are you sure you delete this data ?',
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
                denyButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {
                     axios.delete(base_url + '/Grade/' + id_class, config)
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