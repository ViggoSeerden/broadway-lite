import { EuiFlexGroup, EuiImage, EuiSpacer, EuiText } from '@elastic/eui'
import LoginButton from '../components/LoginButton'
import '../css/LoginPage.css'
import AboutPopup from '../components/AboutPopup'
import logo from '../img/logo.png'

export default function Login() {
    return (
        <EuiFlexGroup alignItems='center' justifyContent='center' direction='column'>
            <EuiSpacer size='xl'/>
            <EuiImage src={logo} alt='logo' size='xl'/>
            <LoginButton/>
            <EuiText textAlign='center' className='fadein credits'>Broadway originally made by <br /> Steijn Ploegmakers & Viggo Seerden</EuiText>
            <EuiText textAlign='center' className='fadein credits'>Lite version made by Viggo Seerden</EuiText>
            <AboutPopup />
        </EuiFlexGroup>
    )
}