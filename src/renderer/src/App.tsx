import { useAuthStore } from '@renderer/stores/authStore'
import LoginPage from '@renderer/pages/LoginPage'
import MainPage from '@renderer/pages/MainPage'

function App(): React.JSX.Element {
  const token = useAuthStore((s) => s.token)
  return token ? <MainPage /> : <LoginPage />
}

export default App
