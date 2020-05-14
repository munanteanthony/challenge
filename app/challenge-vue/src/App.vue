<template lang='pug'>
  #app
    #container-1.container
      #chart
        pie-chart(v-bind:data='charData')
      #header-container
        #search-container
          i(class='fas fa-search-plus fa-4x')
          input( placeholder='Nombre...' v-model='filtro')
        button#add-user-button(onclick="showTab('container-2')")
            i(class='fas fa-user-plus fa-3x')
      #users-table
        table
          thead
            tr
              th id
              th Nombre
              th Apellidos
              th Sexo
              th Celular
              th sueldo
              th AFP  
              th ONP
              th Opciones
          tbody
            tr(v-for='user in filteredUsers')
              td(style='font-weight:bold') {{user.id}}
              td {{user.nombre}}
              td {{user.apellidos}}
              td {{user.sexo}}
              td {{user.celular}}
              td {{user.sueldo}}
              td {{user.afp}}
              td {{user.onp}}
              td
                button#update-user-button(v-on:click="getUser(user.id), actualizar=user.id" onclick="showTab('container-2')")
                  i(class='fas fa-user-edit') 
                  p Actualizar
                button#delete-user-button(v-on:click="deleteUser(user.id)")
                  i(class='fas fa-user-slash') 
                  p Eliminar
    #container-2.container(style='display:none')
      #user-container
        button(onclick="hideTab('container-2')")#salir x
        label(for='nombre') Nombre
        input#nombre(v-model='usuario.nombre' required)
        label(for='apellidos') Apellidos
        input#apellidos(v-model='usuario.apellidos' required)
        label(for='sexo') Sexo
        select#sexo(v-model='usuario.sexo')
          option(selected) M
          option F
        label(for='celular') Celular
        input#celular(v-model='usuario.celular' required)
        label(for='sueldo') Sueldo
        input#seguro(v-model='usuario.sueldo' required)
        label(for='seguro') seguro
        select( v-on:change='usuario.afp=!usuario.afp, usuario.onp=!usuario.onp' required)
          option(selected) afp
          option onp
        #options-container
          button(v-on:click="registerUser()") Registrar
          button(v-on:click="updateUser(actualizar)" v-show="actualizar") Actualizar
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      id:'',
      usuario:{
        nombre:'',
        apellidos:'',
        sexo:'M',
        celular:'',
        sueldo:'',
        afp: true,
        onp: false,
      },
      usuarios:[],
      filtro:'',
      mensaje:'',
      actualizar:false,
      charData:[]
    }
  },
  methods:{
    registerUser(){
      this.$http.post('http://localhost:3000/users',{
          nombre: this.usuario.nombre,
          apellidos: this.usuario.apellidos,
          sexo: this.usuario.sexo,
          celular: this.usuario.celular,
          sueldo: this.usuario.sueldo,
          afp: this.usuario.afp,
          onp: this.usuario.onp
      }).then((data)=>{this.usuarios.push(data.body);
                        let afp=0;
                        let onp=0;
                        for(let i=0; i<this.usuarios.length-1;i++){
                          if(this.usuarios[i].afp){
                              afp=afp+1;
                          }else{
                            onp=onp+1;
                          }
      }
      this.charData=[['afp', afp],['onp', onp]];
                       });
    },
    deleteUser(id){
      this.$http.delete(`http://localhost:3000/users/${id}`).then( ()=> {
          const index = this.usuarios.findIndex(usuario => usuario.id === id)
          this.usuarios.splice(index, 1);
          let afp=0;
          let onp=0;
        for(let i=0; i<this.usuarios.length-1;i++){
            if(this.usuarios[i].afp){
              afp=afp+1;
            }else{
              onp=onp+1;
            }
      }
      this.charData=[['afp', afp],['onp', onp]];
  });
    },
    getUser(id){
        this.$http.get(`http://localhost:3000/users/${id}`).then(data=>{ Object.assign(this.usuario,data.body)});
    },
    updateUser(id){
      this.$http.put(`http://localhost:3000/users/${ id }`,{
          nombre: this.usuario.nombre,
          apellidos: this.usuario.apellidos,
          sexo: this.usuario.sexo,
          celular: this.usuario.celular,
          sueldo: this.usuario.sueldo,
          afp: this.usuario.afp,
          onp: this.usuario.onp
      }).then(()=> {
          const index = this.usuarios.findIndex(usuario => usuario.id === id);
          console.log(index);
          Object.assign(this.usuarios[index],this.usuario)});
      this.actualizar='';
    }
  },
  computed:{
    filteredUsers:function(){
      return this.usuarios.filter(usuario=>{
        return usuario.nombre.match(this.filtro);
      });
    }
  },
  created(){
    this.$http.get('http://localhost:3000/users').then(data=>{ 
      this.usuarios=data.body;
      let afp=0;
      let onp=0;
      for(let i=0; i<data.body.length-1;i++){
          if(data.body[i].afp){
            afp=afp+1;
          }else{
            onp=onp+1;
          }
      }
      this.charData=[['afp', afp],['onp', onp]];
      });
  }
}
</script>

<style lang='scss'>
$blue:   #00005c;
$white:  #ffffff;
$green:  #00e676;
$purple: #6a097d;
$red:    #d32f2f;
$gray:   #78909c;
*{
    margin:0;
    padding:0;
  }
  button{
    cursor: pointer;
  }
  body{
    width: 100vw;
    position: relative;
    
  }
.container {
  width: 100%;
  height: 100vh;
}
#container-1{
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  background: $blue;
  position: absolute;
  z-index: 1; 
}
#header-container{
  grid-column: 1 /span 12;
  grid-row: 1/ span 2;
  background: $blue;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  #search-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 70px;
    input{
      height: 40px;
      font-size: 30px;
      border: none;
      outline: none;
      border-radius: 8px;
    }
    i{
      color: $white;
      display: inline-block;
      margin-right: 15px;
    }
  }
  #add-user-button{
    margin-right: 70px;
    background: $purple;
    border: none;
    color:$white;
    padding: 15px;
    cursor: pointer;
    border-radius: 8px;
    outline: none;
  }
}
#users-table{
  grid-column: 1 / span 9;
  grid-row: 3 / span 10;
  background: $white;
  table{
    background: $white;
    width: calc(100% - 140px);
    height: 80%;
    margin: 30px auto 70px auto;
  }
}


#update-user-button{
  background: $green;
  color: $white;
  border:none;
  outline: none;
  width: 100px;
  padding: .6em .8em;
  border-radius: 8px;
  p,i{
    display: inline;
  }
  i{
    margin-right: 5px;
  }
}

#delete-user-button{
  background: $red;
  color: $white;
  border:none;
  outline: none;
  width: 100px;
  padding: .6em .8em;
  border-radius: 8px;
  p,i{
    display: inline;
  }
  i{
    margin-right: 5px;
  }
}

table, th, td {
  border-collapse: collapse;
}

th, td {
  text-align: center;
}

tr{
  border-bottom: 1px solid $gray;
}
#container-2{
  background: rgba(255,255,255,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
}
#user-container{
  padding: 40px;
  width: 20%;
  background: $blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: $white;
  border-radius: 20px;
  *{
    margin-bottom: 5px;
  }
  input{
    height: 30px;
    width: 90%;
    border: 1px solid #5c6bc0;
    background: $blue;
    color: $white;
  }
  select{
    color: $white;
    background: $blue;
    border: 1px solid #5c6bc0;
  }
}
#options-container{
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  button{
    background: $purple;
    color: $white;
    border:none;
    outline: none;
    width: 100px;
    padding: .7em 1em;
  }
}
#salir{
  align-self: flex-end;
  border: 1px solid #5c6bc0 ;
  background: none;
  color: #5c6bc0;
  border-radius: 50%;
  padding: 5px 10px;
  outline: none;
}

#chart{
  grid-column: 10 / span 3;
  grid-row: 3 / span 10;
  background: $white;
}


</style>