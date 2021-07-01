import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { MenuContainer } from "./styled";


const MenuCard = () => {
  const params = useParams();
  const restaurantDetail = UseRequestApi(
    `${BASE_URL}/restaurants/${params.idRest}`,
    []
  );

  const MenuList =
    props.restaurantDetail.restaurant &&
    props.restaurantDetail.restaurant.products &&
    props.restaurantDetail.restaurant.products.map((product) => {
      return (
        <Card className={"root"}>
          <CardMedia
            className={"cover"}
            image={product.photoUrl}
            title={product.name}
          />
            <CardContent className={"details"}>
              <div className={"content"}>
               <div className={"name"}>
              <Typography
                className={"name"}
                component="h8"
                color="primary"
                variant="h8"
                >
                {product.name}
              </Typography>
                 </div> 
              <p>qtd</p>
              </div>
              <Typography
                className={"description"}
                variant="subtitle1"
                color="textSecondary"
              >
                {product.description}
              </Typography>
              <div className={"controls"}>
                <Typography
                  className={"price"}
                  variant="body2"
                  color="textPrimary"
                  component="p"
                >
                  R${product.price}0
                </Typography>
                <button className={"Rectangle"} onClick={""}>adicionar</button>
              </div>
            </CardContent>
        </Card>
      );
    });

  return (
    <MenuContainer>
      <Card className={"CardMenu"}>
        <CardActionArea key={"1"}>
          <CardMedia
            className={"media"}
            image={
              props.restaurantDetail.restaurant && props.restaurantDetail.restaurant.logoUrl
            }
            title={
              props.restaurantDetail.restaurant && props.restaurantDetail.restaurant.name
            }
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              color="primary"
              component="h2"
            >
              {props.restaurantDetail.restaurant && props.restaurantDetail.restaurant.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.restaurantDetail.restaurant &&
                props.restaurantDetail.restaurant.category}
            </Typography>
            <div className={"shippingTimeContainer"}>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.restaurantDetail.restaurant &&
                  props.restaurantDetail.restaurant.deliveryTime}{" "}
                min
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Frete R${" "}
                {props.restaurantDetail.restaurant &&
                  props.restaurantDetail.restaurant.shipping}
                ,00
              </Typography>
            </div>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.restaurantDetail.restaurant &&
                props.restaurantDetail.restaurant.address}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {MenuList}
    </MenuContainer>
  );
};
export default MenuCard;
