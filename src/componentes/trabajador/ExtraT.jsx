import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router'
import { db } from '../../firebase'
import Dashboard from './DashboardT'

const ExtraT = () => {
  const [descripcion, setDescripcion] = useState("");

  const navigate = useNavigate();
  const {id} = useParams()
  
  const update = async (e) =>{
    e.preventDefault()
    const product = doc(db,"proyectos",id)
    const data = { 
      descripcion:descripcion,
    }
    await updateDoc(product,data)
    navigate(`/VerdetalleT/${id}`);
  }

  const getProductById = async (id) =>{
    const product = await getDoc(doc(db,"proyectos",id))
    if(product.exists()){
      setDescripcion(product.data().descripcion)
    }else{
      console.log('el producto no existe')
    }
  }

  useEffect ( () => {
    getProductById(id)
  }, [])

  return (
    <div className="w-full min-h-screen">
      <Dashboard />
      <div className="absolute inset-4 -z-10 overflow-hidden mt-9">
        <svg
          className="absolute left-[max(50%,25rem)] top-2 h-[64rem] w-[128rem] -translate-x-1/2 stroke-orange-500 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-5} className="overflow-visible fill-gray-300">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={12}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className=" mt-10 ">
          <div className="w-full max-w-5xl m-auto text-black ">
            <h2 className="text-center text-5xl font-bold mb-4">
              {" "}
              Editar Proyecto {" "}
            </h2>

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-6"
            onSubmit={update}>
              <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Descripciones Extras del proyecto:
                </label>
                <textarea
                  type="text"
                  rows={10}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Especificaciones o instruciones extras"
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

export default ExtraT