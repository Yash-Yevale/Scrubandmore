import {
  Box,
  Divider,
  Grid,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas, setToast } from "../../utils/extraFunctions";
import { ImageModal } from "../../components/description/ImageModal";
import { SelectSize } from "../../components/description/SelectSize";
import { NewButton } from "../../components/description/NewButton";
import { getItemSession } from "../../utils/sessionStorage";
import { addToCartRequest } from "../../redux/features/cart/actions";
import { useState } from "react";
import { addToFavouriteRequest } from "../../redux/features/favourite/actions";
import { useNavigate } from "react-router-dom";

export const Description = () => {
  const data = getItemSession("singleProduct");
  const { title, gender, description, category, price, size, color, rating, img } =
    data;

  const [mySize, setMySize] = useState(null);
  const token = useSelector((state) => state.authReducer.token);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!mySize) {
      setToast(toast, "Please select a size", "error");
      return;
    }

    const payload = {
      id: data._id || data.id,
      name: title,
      image: img?.[0],
      size: mySize,
      price: Number(price),
      color: null,
      fragrance: null,
      qty: 1,
    };

    dispatch(addToCartRequest(payload, toast, "add"));
  };

  const handleAddToFavourite = () => {
    if (!token) {
      setToast(toast, "Please login first", "error");
      navigate("/auth");
    } else {
      dispatch(addToFavouriteRequest(data, token, toast));
    }
  };

  return (
    <Grid
      p="10px"
      gap="4%"
      templateColumns={["100%", "100%", "60% 36%"]}
      w="90%"
      m="40px auto"
    >
      <ImageModal img={img} />

      <Box>
        <Text fontSize="29px">{title}</Text>
        <Text>{description}</Text>

        <Text fontSize="22px" mt="20px">
          ₹ {numberWithCommas(price)}
        </Text>

        <Text color="gray">incl. of taxes and duties</Text>

        <Text fontSize="18px" mt="30px" mb="10px">
          Select Size
        </Text>

        <SelectSize size={size} setMySize={setMySize} />

        <NewButton
          click={handleAddToCart}
          name="Add to Bag"
          bgColor="black"
          color="white"
        />

        <NewButton
          click={handleAddToFavourite}
          name="Favourite"
          bgColor="white"
          color="black"
          borderColor="#cecdce"
        />

        <Divider my="30px" />

        <Text fontSize="18px" textDecoration="underline">
          Product Details
        </Text>

        <UnorderedList fontSize="18px">
          <ListItem>Gender: {gender}</ListItem>
          <ListItem>Category: {category}</ListItem>
          <ListItem>Colour: {color}</ListItem>
          <ListItem>Rating: {rating}</ListItem>
        </UnorderedList>
      </Box>
    </Grid>
  );
};
