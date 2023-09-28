import { useState } from 'react';
import { Button, Popconfirm, InputNumber, Table, message, Modal, Form, Input} from "antd"
import { useCartContext } from "../../context/cartContext"
import { useSearchContext } from "../../context/searchContext"
import { QuestionCircleOutlined } from '@ant-design/icons';

function Cart() {
  const {loading, setLoading} = useSearchContext()
  const {cartItems, setCartItems, removeFromCart} = useCartContext()
  const [open, setOpen] = useState(false);
  
  const showModal = () => {
    setOpen(true);
  };
  

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('Order successfully completed')
      setCartItems([])
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={{padding: 10}}>
        <Table columns={[
            {title: "Title", dataIndex: "title"},
            {
            title: "Price",
            dataIndex: "price",
            render: (value) => {
              return <span>${value}</span>
            }
          },
            {
            title: "Quantity",
            dataIndex: "quantity",
            render: (value, record) => {
              return <InputNumber min={0} defaultValue={value}
                onChange={(value) => {
                  setCartItems(preCart => preCart.map(cart => {
                    if(cart.id === record.id) {
                      cart.total = cart.price * value;
                    }
                    return cart;
                  }))
                }}
              ></InputNumber>
            },
          },
            {
            title: "Total",
            dataIndex: "total",
            render: (value) => {
              return <span>${value}</span>
            }
          },
          {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
              <Popconfirm
                title="Remove from cart"
                description="Are you sure you want to remove from cart?"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => removeFromCart(record.id)}
              >
                <Button danger>Remove</Button>
              </Popconfirm>
            ),
          },          
          ]} 
        pagination={false}
        dataSource={cartItems}
        summary={(data) => {
          const total = data.reduce((pre, current) => {
            return pre + current.total;
          }, 0);
          return `Total: $${total}`;
        }}
        />
        <Button type="primary" onClick={showModal}>Checkout</Button>
      </div>
      <Modal
        open={open}
        title="Confirm Order"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} 
            onClick={handleOk}>
            Confirm Order
          </Button>
        ]}
      >
        <Form>
          <Form.Item 
          rules={[{required: true, message:'Please enter your full name'}]} 
          label='Full name' name='fullName'>
            <Input placeholder='Enter your full name...'/>
          </Form.Item>
          <Form.Item rules={[{required: true, type: 'email', message:'Please enter a valid email'}]} 
          label='Email' name='email'>
            <Input placeholder='Enter your email...'/>
          </Form.Item>
          <Form.Item rules={[{required: true, message:'Please enter your address'}]} 
          label='Address' name='address'>
            <Input placeholder='Enter your address...'/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Cart

