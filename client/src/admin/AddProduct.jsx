import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  HStack,
  Divider,
  Select,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const COLOR_OPTIONS = ["Lavender", "Pink", "White", "Swan White", "Mango & Peach"];

const FRAGRANCE_OPTIONS = ["Vanilla", "Lychee", "Watermelon", "Mix Fruits"];

export default function AddProduct({ editingProduct, onSaved }) {
  const [form, setForm] = useState({
    name: "",
    image: "",
    category: "scrubs",
    ingredients: "",
    description: "",
    sizes: [{ label: "", price: "" }],
    soldOut: false,

    enableColors: false,
    colors: [],

    enableFragrances: false,
    fragrances: [],
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        image: editingProduct.image || "",
        category: editingProduct.category || "scrubs",
        ingredients: editingProduct.ingredients || "",
        description: editingProduct.description || "",
        sizes: editingProduct.sizes || [{ label: "", price: "" }],
        soldOut: editingProduct.soldOut || false,

        enableColors: editingProduct.colors?.enabled || false,
        colors: editingProduct.colors?.options || [],

        enableFragrances: editingProduct.fragrances?.enabled || false,
        fragrances: editingProduct.fragrances?.options || [],
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (index, field, value) => {
    const updated = [...form.sizes];
    updated[index][field] = value;
    setForm({ ...form, sizes: updated });
  };

  const addSize = () => {
    setForm({ ...form, sizes: [...form.sizes, { label: "", price: "" }] });
  };

  const removeSize = (index) => {
    setForm({
      ...form,
      sizes: form.sizes.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.image) {
      alert("Product Name and Image URL are required");
      return;
    }

    try {
      const payload = {
        name: form.name,
        image: form.image,
        category: form.category,
        ingredients: form.ingredients,
        description: form.description,
        sizes: form.sizes,
        soldOut: form.soldOut,

        colors: {
          enabled: form.enableColors,
          options: form.colors,
        },

        fragrances: {
          enabled: form.enableFragrances,
          options: form.fragrances,
        },
      };

      // ADD PRODUCT
      if (!editingProduct) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/admin/products`,
          payload
        );
        alert("Product added successfully");
      }

      // UPDATE PRODUCT
      else {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/admin/products/${editingProduct._id}`,
          payload
        );
        alert("Product updated successfully");
      }

      // RESET FORM
      setForm({
        name: "",
        image: "",
        category: "scrubs",
        ingredients: "",
        description: "",
        sizes: [{ label: "", price: "" }],
        soldOut: false,
        enableColors: false,
        colors: [],
        enableFragrances: false,
        fragrances: [],
      });

      onSaved && onSaved();
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  return (
    <Box border="1px solid" borderColor="gray.200" p={6} borderRadius="lg">
      <Heading size="md" mb={4}>
        {editingProduct ? "Edit Product" : "Add New Product"}
      </Heading>

      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          placeholder="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
        />

        <Textarea
          placeholder="Ingredients"
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
        />

        <Textarea
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <Divider />

        <HStack>
          <Text fontWeight="bold">Sold Out</Text>
          <Select
            value={form.soldOut ? "yes" : "no"}
            onChange={(e) =>
              setForm({ ...form, soldOut: e.target.value === "yes" })
            }
            w="120px"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </Select>
        </HStack>

        <Divider />

        <Checkbox
          isChecked={form.enableColors}
          onChange={(e) =>
            setForm({ ...form, enableColors: e.target.checked })
          }
        >
          Enable Colors
        </Checkbox>

        {form.enableColors && (
          <CheckboxGroup
            value={form.colors}
            onChange={(values) => setForm({ ...form, colors: values })}
          >
            <Stack>
              {COLOR_OPTIONS.map((c) => (
                <Checkbox key={c} value={c}>
                  {c}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        )}

        <Divider />

        <Checkbox
          isChecked={form.enableFragrances}
          onChange={(e) =>
            setForm({ ...form, enableFragrances: e.target.checked })
          }
        >
          Enable Fragrances
        </Checkbox>

        {form.enableFragrances && (
          <CheckboxGroup
            value={form.fragrances}
            onChange={(values) => setForm({ ...form, fragrances: values })}
          >
            <Stack>
              {FRAGRANCE_OPTIONS.map((f) => (
                <Checkbox key={f} value={f}>
                  {f}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        )}

        <Divider />

        <Text fontWeight="bold">Sizes & Prices</Text>

        {form.sizes.map((s, i) => (
          <HStack key={i}>
            <Input
              placeholder="Size"
              value={s.label}
              onChange={(e) =>
                handleSizeChange(i, "label", e.target.value)
              }
            />
            <Input
              placeholder="Price"
              type="number"
              value={s.price}
              onChange={(e) =>
                handleSizeChange(i, "price", e.target.value)
              }
            />
            <Button colorScheme="red" onClick={() => removeSize(i)}>
              X
            </Button>
          </HStack>
        ))}

        <Button onClick={addSize}>+ Add Size</Button>

        <Divider />

        <Button colorScheme="green" size="lg" onClick={handleSubmit}>
          {editingProduct ? "Update Product" : "Add Product"}
        </Button>
      </VStack>
    </Box>
  );
}
