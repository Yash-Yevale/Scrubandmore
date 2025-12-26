import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import api from "../../utils/axios";

export const OtpBox = ({ onVerified }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    await api.post("/api/otp/send", { mobile });
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await api.post("/api/otp/verify", { mobile, otp });
    if (res.data.verified) {
      onVerified(mobile);
    }
  };

  return (
    <Box border="1px solid #ddd" p={4} borderRadius="md">
      <VStack spacing={3}>
        {step === 1 && (
          <>
            <Input
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <Button onClick={sendOtp} colorScheme="green">
              Send OTP
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button onClick={verifyOtp} colorScheme="green">
              Verify OTP
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};
