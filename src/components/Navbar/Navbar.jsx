/* eslint-disable react/prop-types */
import {Badge, Menu} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {ShoppingCartOutlined, HomeOutlined, BookOutlined} from '@ant-design/icons'
import './Navbar.css';
import { useCartContext } from '../../context/cartContext';

function Navbar() {
  return (
    <nav className='navbar'>
      <AppMenu/>
    </nav>
  )
}

function AppMenu ({isInline=false}) {
  const navigate = useNavigate()
  const {cartItems} = useCartContext()

  const handleClick = ({key}) => {navigate(key)}
  return (
    <div className='navMenu'>
      <Menu
        className='navItems'
        onClick={handleClick}
        mode= {isInline ? 'inline':'horizontal' }
        items={[
          {label: 'Home',key:'/', icon: <HomeOutlined/>},
          {label: 'BookList',key:'/book', icon:<BookOutlined />}
          ]}
      />
      <Link to="/cart">
        <Badge count={cartItems.length} className='cart'>
          <ShoppingCartOutlined />
        </Badge>
      </Link>

    </div>
  )
}
export default Navbar
