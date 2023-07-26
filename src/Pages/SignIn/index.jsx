import { useContext, useState, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function SignIn() {
  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')
  const form = useRef(null)

  // Cuenta
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Tiene una cuenta
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(false)
    return <Navigate replace to={'/'}/>
   }

  const createAnAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)
    handleSignIn()
  }

  const renderLogin = () => {
    return(
      <section className='flex flex-col items-center justify-center w-full h-full'>
      <h1 className='text-2xl font-semibold mb-5 drop-shadow-md'>Bienvenidos a Shopi</h1>
      <div className='flex flex-col w-80'>

        <p>
          <span>Email: </span>
          <span className='font-semibold'>{parsedAccount?.email}</span>
        </p>

        <p className='mb-5'>
          <span>Contraseña: </span>
          <span className='font-semibold'>{parsedAccount?.password}</span>
        </p>
        
        <Link className='rounded-md' to='/'>
          <button
          className='w-full bg-black disabled:bg-black/40 disabled:text-white disabled:border-none border text-white p-3 rounded-md hover:text-black hover:bg-transparent hover:border border-black transition duration-200'
          disabled={!hasUserAnAccount}
          onClick={() => handleSignIn()}
          >
            Iniciar sesión
          </button>
        </Link>

        <a className='text-sm font-normal mt-2 text-center hover:underline hover:underline-offset-2 transition duration-200' href='/'>¿Olvidaste tu contraseña?</a>

        <button
        onClick={() => setView('create-user-info')}
        className='text-black mt-5 border border-black text-sm p-3 rounded-md hover:text-white hover:bg-black transition duration-200 disabled:bg-black/40 disabled:text-white disabled:border-none'
        disabled={hasUserAnAccount}
        >
          Registrarse
        </button>

      </div>

      </section>
    )
  }

  const renderCreateUser = () => {
    return(
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <h1 className='text-center text-3xl'>Bienvenido a Shopi</h1>
        <div className='flex flex-col gap-1'>

          <label htmlFor="name" className='font-normal text-lg'>Tu nombre:</label>
          <input
          type='text'
          id='name'
          name='name'
          defaultValue={parsedAccount?.name}
          placeholder='Nombre'
          className='border-2 border-black rounded-md placeholder:font-normal placeholder:text-black/60 focus:outline-none py-2 px-4'
          />

        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="email">Tu email:</label>
            <input
            type='text'
            required
            id='email'
            name='email'
            defaultValue={parsedAccount?.email}
            placeholder='tuemail@gmail.com'
            className='border-2 border-black rounded-md placeholder:font-normal placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="password">Contraseña</label>
          <input
          type='password'
          id='password'
          name='password'
          defaultValue={parsedAccount?.password}
          placeholder='******'
          className='border-2 border-black rounded-md placeholder:font-normal placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>

        <Link to='/'>
          <button
          className='bg-black text-white border-2 font-medium w-full rounded-md py-3 hover:text-black hover:border-2 border-black hover:bg-transparent hover:font-medium transition duration-200'
          onClick={() => createAnAccount()}
          >
            Crear cuenta
          </button>
        </Link>
      </form>
    )

  }

  const renderView = () => view === 'create-user-info' ? renderCreateUser() : renderLogin()

  return (
    <Layout>
      {renderView()}
    </Layout>
  )
}

export default SignIn