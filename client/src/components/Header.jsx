import logo from './../assets/image/logo.png'
const Header = ({Page}) => <header>
            <img className="logo" src={logo} alt="Logo Librairie XYZ"/>
            <h1>{Page} - Librairie XYZ</h1>
        </header>

export default Header