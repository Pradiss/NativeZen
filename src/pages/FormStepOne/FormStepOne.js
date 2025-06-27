import { useRef } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormContext } from "react-hook-form";


import styles from "../../components/Style";
import { Button } from "../../components/BtnForm";
import { Input } from "../../components/Input";
import { Progress } from "../../components/Progress";


export function FormStepOne() {
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const emailRef = useRef(null);

  function handleNextStep() {
    navigate("FormStepTwo");
  }

  return (
    <View style={styles.container}>
      <Progress progress={30} />
      <Text style={styles.h2}>Criar sua conta</Text>

      <Input
        name="name"
        error={errors?.name?.message}
        formProps={{
          control,
          name: "name",
          rules: {
            required: "O nome é obrigatório",
          },
        }}
        inputProps={{
          placeholder: "Nome",
          onSubmitEditing: () => emailRef.current?.focus(),
          returnKeyType: "next",
        }}
      />

      <Input
        name="email"
        ref={emailRef}
        icon="mail"
        error={errors?.email?.message}
        formProps={{
          control,
          name: "email",
          rules: {
            required: "O e-mail é obrigatório",
            pattern: {
              value: /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[a-z]+\.([a-z]+)?$/i,
              message: "E-mail inválido",
            },
          },
        }}
        inputProps={{
          placeholder: "E-mail",
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </View>
  );
}
