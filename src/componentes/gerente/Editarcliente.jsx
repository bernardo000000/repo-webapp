import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router'
import { db } from '../../firebase'
import Dashboard from './Dashboard'


const Editarcliente = () => {
  const [nombre, setNombre] = useState("");
  const [legal, setLegal] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [datos, setDatos] = useState("");

  const navigate = useNavigate();
  const {id} = useParams()

  const update = async (e) =>{
    e.preventDefault()
    const product = doc(db,"clientes",id)
    const data = { nombre: nombre,
      rut: rut,
      relegals:legal,
      telefono: telefono,
      email: email,
      datosfacturacion: datos
    }
    await updateDoc(product,data)
    navigate('/Clientes')
  }

  const getProductById = async (id) =>{
    const product = await getDoc(doc(db,"clientes",id))
    if(product.exists()){
      setNombre(product.data().nombre)
      setRut(product.data().rut)
      setLegal(product.data().relegals)
      setTelefono(product.data().telefono)
      setEmail(product.data().email)
      setDatos(product.data().datosfacturacion)
      
    }else{
      console.log('el producto no existe')
    }
  }

  useEffect ( () => {
    getProductById(id)
  }, [])

  return (
    <div className="w-full">
      <Dashboard />
      <div className=" mt-10 ">
          <div className="w-full max-w-xs m-auto text-black ">
            <h2 className="text-center text-5xl font-bold mb-4">
              {" "}
              Editar Cliente {" "}
            </h2>

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-6"
            onSubmit={update}>
                <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nombre Cliente:
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nombre Cliente "
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Rut Cliente:
                </label>
                <input
                  type="text"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="00000000-0"
                />
              </div>
              
              <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Representante legal:
                </label>
                <input
                  type="text"
                  value={legal}
                  onChange={(e) => setLegal(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nombre Apellido"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={ (e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="youremail@company.tld"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Telefono Cliente:
                </label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="+000 00000000"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Datos facturacion cliente:
                </label>
                <input
                  type="text"
                  value={datos}
                  onChange={(e) => setDatos(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  
                />
              </div>

              <button className="bg-orange-400 hover:bg-orange-300 text-white  font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
                Editar
              </button>
              
            </form>
          </div>
        </div>
    </div>
  )
}

export default Editarcliente