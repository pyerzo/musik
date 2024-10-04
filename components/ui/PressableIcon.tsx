import { Colors } from "@/constants/Colors";
import { LucideIcon, LucideProps } from "lucide-react-native";
import { Pressable, StyleProp, useColorScheme, ViewStyle } from "react-native";

export interface PressableIconProps{
  icon: LucideIcon
  style?: StyleProp<ViewStyle>
  iconProps?: LucideProps
  onPress?: () => void
}

export default function PressableIcon(
  {icon: Icon, style = {}, iconProps = {}, onPress}: PressableIconProps
) {
  const colorScheme = useColorScheme();

  return (
    <Pressable style={style} onPress={onPress}>
      <Icon
        {...iconProps} 
        strokeWidth={iconProps.strokeWidth ?? 1.5}
        color={Colors[colorScheme ?? "light"].icon}
      />
    </Pressable>
  );
}
