import Header from './Header'
import Footer from './Footer'
import Sidebar from './SideBar'
const Template = ({page="accueil", children, userT}) => <><Header Page={page}/>
<div className="childrenwrapper"><Sidebar userT={userT}/>{children}</div>
            <Footer/></>

export default Template