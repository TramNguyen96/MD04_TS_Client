import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.scss'

/* Store */
import { Provider } from 'react-redux'
import store from './stores/index.ts'

/* i18n */
import { I18nextProvider } from 'react-i18next'
import i18nConfig from './i18n/config.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18nConfig}>
      <App />
    </I18nextProvider>
  </Provider>

)
