import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import CreateIcon from "@material-ui/icons/Create";
import ShoppingCarticon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import PersonOutline from "@material-ui/icons/PersonOutline";
import { Container, Header, PersonalInformation, OrderHistory} from "./styled";
import axios from 'axios';
import { BASE_URL } from '../../constants/urls';
import CardHistory from "./CardHistory";
import { useHistory } from "react-router-dom";
import { goToEditProfile, goToEditAddress } from '../../routes/coordinator'
import {useGlobalStates, useGlobalSetters} from '../../global/GlobalState'

export default function ProfilePage() {
  const history = useHistory()
  const {user} = useGlobalStates()
  const {setUser} = useGlobalSetters()
  const [ordersHistory, setOrdersHistory] = useState([])


  const order = {
    totalPrice: 20,
    restaurantName: "Habibs",
    createdAt: 1574660015364,
    expiresAt: 1574663615364,
  };


  const changeProfile = () => {
    goToEditProfile(history)
  }

  const changeAddress = () => {
    goToEditAddress(history)
  }

    const orderHistory = () => {
      axios.get(`${BASE_URL}/orders/history`, {
          headers: {
              auth: localStorage.getItem("token"),
          }
      })
      .then((res) => {
        console.log(res.data)
        setOrdersHistory(res.data.orders)
      })
      .catch((err) => {
        alert('Ocorreu um erro, tente novamente')
      })
    }

    useEffect(() => {
      orderHistory()
    }, [])

    const ordersMade = ordersHistory.map((order) => {
      return(
        <CardHistory totalPrice={order.totalPrice}
        restaurantName ={order.restaurantName}
        createdAt={order.createdAt} />
      )
    })

  return (
    <>
      <div>
        <Footer />
      </div>
      <Container>
        <Header>
          <p className="tituloCenter">Meu perfil</p>
        </Header>
        <PersonalInformation>
          <div>
            <p>{user.name} </p>
            <p>{user.email}</p>
            <p>{user.cpf}</p>
          </div>
          <button onClick={changeProfile}>
            <CreateIcon />
          </button>
        </PersonalInformation>

        <PersonalInformation className={"address"}>
          <div>
            <p>Endereço cadastrado</p>
            <p>{user.address}</p>
          </div>

          <button onClick={changeAddress}>
            <CreateIcon />
          </button>
        </PersonalInformation>

        <OrderHistory>
          <h3>Histórico de pedidos</h3>
          <div className="division-orders"></div>

         {ordersHistory.length > 0 ? ordersMade : <p className='noRequests'>Você não realizou nenhum pedido</p>}

       
        </OrderHistory>
        <Footer />
      </Container>
    </>
  );
}
