import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('sogoUser') || sessionStorage.getItem('sogoUser')
    if (storedUser) {
      setTimeout(() => {
        navigate('/servicedesk')
      }, 500)
    } else {
      // Pre-fill email if remembered
      const rememberedEmail = localStorage.getItem('sogoRememberedEmail')
      if (rememberedEmail) {
        setEmail(rememberedEmail)
        setRemember(true)
      }
    }
  }, [navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    
    if (email && password) {
      setIsLoading(true)
      
      setTimeout(() => {
        if (remember) {
          localStorage.setItem('sogoUser', email)
          localStorage.setItem('sogoRememberedEmail', email)
        } else {
          sessionStorage.setItem('sogoUser', email)
          localStorage.removeItem('sogoRememberedEmail')
        }
        
        navigate('/servicedesk')
      }, 1500)
    }
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    alert('Password reset link would be sent to your email.\n\nFor demo purposes, please use any email/password to login.')
  }

  const handleSignup = (e) => {
    e.preventDefault()
    alert('Please contact your system administrator to request an account.\n\nEmail: admin@sogo.com')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-container min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-[#0b1220] relative overflow-hidden flex-col md:flex-row">
      {/* Background animation overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        animation: 'float 20s ease-in-out infinite'
      }}></div>

      {/* Left side - Branding */}
      <div className="flex-1 flex items-center justify-center p-10 relative z-10 min-h-[40vh] md:min-h-0">
        <div className="text-center text-white max-w-[500px]">
          <div className="text-[80px] mb-1 animate-bounce">
            <img src="/logoa.png" alt="SOGO" className="w-[180px] h-[180px] object-contain mx-auto" />
          </div>
          <h1 className="text-[42px] font-extrabold mb-2 drop-shadow-lg">GOLI Service Operations</h1>
          <p className="text-lg opacity-95 mb-8 font-medium"></p>
          <div className="flex flex-col gap-4 text-left"></div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 md:flex-[2] flex items-center justify-center p-10 bg-white/95 backdrop-blur-[10px] relative z-10">
        <div className="bg-white rounded-[20px] p-12 shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-[450px] animate-slide-in-right">
          <div className="text-center mb-8">
            <h2 className="text-[28px] font-extrabold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-500">Sign in to access your dashboard</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4">
              <div className="flex items-start gap-2">
                <span className="text-base">ℹ️</span>
                <div className="text-xs text-blue-800">
                  <strong>Demo Mode:</strong> Use any email and password to login
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700" htmlFor="email">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3.5 px-4 pl-12 border-2 border-gray-200 rounded-[10px] text-[15px] text-gray-800 transition-all duration-300 bg-white focus:outline-none focus:border-gray-800 focus:shadow-[0_0_0_4px_rgba(255,78,69,0.1)]" 
                  placeholder="you@goli.com"
                  required
                  autoComplete="email"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">📧</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700" htmlFor="password">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3.5 px-4 pl-12 pr-12 border-2 border-gray-200 rounded-[10px] text-[15px] text-gray-800 transition-all duration-300 bg-white focus:outline-none focus:border-gray-800 focus:shadow-[0_0_0_4px_rgba(255,78,69,0.1)]" 
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">🔒</span>
                <span 
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-lg opacity-50 hover:opacity-100 transition-opacity"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center -mt-2">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  name="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-[18px] h-[18px] cursor-pointer accent-gray-800"
                />
                <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer">Remember me</label>
              </div>
              <a 
                href="#" 
                className="text-sm text-gray-800 no-underline font-semibold transition-all hover:text-gray-900 hover:underline"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-br from-gray-800 to-gray-900 text-white border-none rounded-[10px] text-base font-bold cursor-pointer transition-all duration-300 mt-2 shadow-[0_4px_12px_rgba(17,24,39,0.3)] hover:bg-gradient-to-br hover:from-gray-900 hover:to-[#0b1220] hover:shadow-[0_6px_20px_rgba(17,24,39,0.4)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="flex gap-3"></div>

          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-[13px] text-gray-500">
              Don't have an account?
              <a 
                href="#" 
                className="text-[#FF4E45] no-underline font-semibold ml-1 hover:underline"
                onClick={handleSignup}
              >
                Contact Admin
              </a>
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-base text-emerald-600">🔒</span>
            <span className="text-xs text-emerald-800 font-semibold">Secured with 256-bit SSL encryption</span>
          </div>

          <div className="text-center mt-4 text-[11px] text-gray-400">
            © 2025 GOLI. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
