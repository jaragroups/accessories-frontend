"use client";

import BillingForm from "@/components/checkout/BillingForm";
import DeliveryForm from "@/components/checkout/DeliveryForm";
import ProductSummary from "@/components/checkout/ProductSummary/ProductSummary";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCart from "@/hooks/useCart";
import flattenAccessories from "@/lib/flattenAccessories";
import { cartActions } from "@/reducers/cartReducer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    addressOne: "",
    addressTwo: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
  });
  const [billingData, setBillingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    addressOne: "",
    addressTwo: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
  });
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const axios = useAxiosSecure();
  const { cart, dispatch } = useCart();
  const {
    user: { user },
  } = useAuth();
  const router = useRouter();

  const flattenedCart = flattenAccessories(cart);

  const handleConfirmOrder = async (subtotalPrice, totalPrice) => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "addressOne",
      "state",
      "country",
      "postalCode",
      "phone",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        toast.error(`All required fields have to be filled.`);
        return;
      }
    }

    if (!billingSameAsShipping) {
      for (const field of requiredFields) {
        if (!billingData[field]) {
          toast.error(`All required billing fields have to be filled.`);
          return;
        }
      }
    }

    const orderItems = flattenedCart.map((product) => {
      const orderItem = {
        product_id: product.id,
        product_name: product.name,
        product_slug: product.slug,
        qty: product?.quantity || 1,
        price: parseFloat(product.price),
      };

      if (product.color) {
        orderItem.color = product.color;
      }

      return orderItem;
    });

    try {
      const effectiveBilling = billingSameAsShipping ? data : billingData;

      const formData = {
        shipping_first_name: data.firstName,
        shipping_last_name: data.lastName,
        shipping_email: data.email,
        shipping_company: data.company,
        shipping_address_1: data.addressOne,
        shipping_address_2: data.addressTwo,
        shipping_state: data.state,
        shipping_country: data.country,
        shipping_postcode: data.postalCode,
        shipping_phone: data.phone,
        billing_first_name: effectiveBilling.firstName,
        billing_last_name: effectiveBilling.lastName,
        billing_email: effectiveBilling.email,
        billing_company: effectiveBilling.company,
        billing_address_1: effectiveBilling.addressOne,
        billing_address_2: effectiveBilling.addressTwo,
        billing_state: effectiveBilling.state,
        billing_country: effectiveBilling.country,
        billing_postcode: effectiveBilling.postalCode,
        billing_phone: effectiveBilling.phone,
        sub_total: subtotalPrice,
        total_amount: totalPrice,
        payment_method: "cod",
        user_email: user.email,
        order_items: orderItems,
      };

      await axios.post("/v1/checkout-store", formData);

      dispatch({ type: cartActions.clearCart });

      toast.success("Order confirmed successfully");
      router.push("/profile/orders");
    } catch (error) {
      toast.error("An error occurred while confirming the order.");
      console.error("Error confirming order:", JSON.stringify(error, null, 2));
    }
  };

  useEffect(() => {
    async function fetchUserDeliveryAddress() {
      const res = await axios.get(
        `/v1/user/delivery-addresses?user_email=${user?.user?.email}&is_default=1`,
      );
      const addressData = res.data?.data?.at(-1);
      console.log("🚀 ~ fetchUserDeliveryAddress ~ addressData:", addressData);

      if (addressData) {
        setData({
          firstName: addressData.first_name || "",
          lastName: addressData.last_name || "",
          email:
            addressData.user_email ||
            user?.emailAddresses?.[0]?.emailAddress ||
            "",
          company: addressData.company || "",
          addressOne: addressData.address_line1 || "",
          addressTwo: addressData.address_line2 || "",
          state: addressData.city || "",
          country: addressData.country || "",
          postalCode: addressData.postal_code || "",
          phone: addressData.phone || "",
        });
        // If billing is same as shipping, prefill billing with the same data
        setBillingData((prev) => ({
          ...prev,
          ...{
            firstName: addressData.first_name || "",
            lastName: addressData.last_name || "",
            email:
              addressData.user_email ||
              user?.emailAddresses?.[0]?.emailAddress ||
              "",
            company: addressData.company || "",
            addressOne: addressData.address_line1 || "",
            addressTwo: addressData.address_line2 || "",
            state: addressData.city || "",
            country: addressData.country || "",
            postalCode: addressData.postal_code || "",
            phone: addressData.phone || "",
          },
        }));
      }
    }

    if (user?.user?.email) {
      fetchUserDeliveryAddress();
    }
  }, [user, axios]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Forms */}
        <div className="space-8 lg:col-span-2">
          <DeliveryForm
            data={data}
            setData={setData}
            billingSameAsShipping={billingSameAsShipping}
            setBillingSameAsShipping={setBillingSameAsShipping}
          />
          {!billingSameAsShipping && (
            <div className="mt-6">
              <BillingForm data={billingData} setData={setBillingData} />
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <ProductSummary handleConfirmOrder={handleConfirmOrder} />
          </div>
        </div>
      </div>
    </section>
  );
}
