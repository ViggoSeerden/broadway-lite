import { EuiFlexGroup, EuiSpacer, EuiText, EuiTitle } from '@elastic/eui'
import LoginButton from '../components/LoginButton'
import '../css/LoginPage.css'
import AboutPopup from '../components/AboutPopup'

export default function Login() {
    return (
        <EuiFlexGroup alignItems='center' justifyContent='center' direction='column'>
            <EuiSpacer size='l'/>
            <EuiTitle size='xl'><h1 className='fadein title'>Broadway Lite</h1></EuiTitle>
            <EuiSpacer size='xl'/>
            <LoginButton/>
            <EuiSpacer size='l'/>
            <EuiText textAlign='center' className='fadein credits'>Broadway originally made by <br /> Steijn Ploegmakers & Viggo Seerden</EuiText>
            <EuiText textAlign='center' className='fadein credits'>Lite version made by Viggo Seerden</EuiText>
            <EuiSpacer size='l'/>
            <AboutPopup />
        </EuiFlexGroup>
    )
}