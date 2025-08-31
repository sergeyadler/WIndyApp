import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import App from './App.jsx'
import {I18nProvider} from "./utils/I18nProvider.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <I18nProvider defaultLang="ru">
            <App/>
        </I18nProvider>
    </StrictMode>,
)
