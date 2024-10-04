import { Colors } from "@/constants/Colors";
import { LucideIcon, LucideProps } from "lucide-react-native";
import { StyleProp, useColorScheme, ViewStyle } from "react-native";

export interface IconProps extends LucideProps{
  icon: LucideIcon
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export default function Icon(
  {icon: Icon, ...props}: IconProps
) {
  const colorScheme = useColorScheme();

  return (
    <Icon
      {...props} 
      strokeWidth={props.strokeWidth ?? 1.5}
      color={Colors[colorScheme ?? "light"].icon}
    />
  );
}
