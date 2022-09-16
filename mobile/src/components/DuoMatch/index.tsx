import {
	View,
	Modal,
	ModalProps,
	Text,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Activity, CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native'

import { Heading } from '../Heading';

import { styles } from './styles';
import { THEME } from '../../theme';

interface Props extends ModalProps {
	discord: string;
	onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
	const [isCopping, setIsCopping] = useState(false);

	async function handleCopyDiscordUserToClipboard() {
		setIsCopping(true);
		await Clipboard.setStringAsync(discord);

		Alert.alert(
			'Discord Copiado!',
			'Usuário copiado para você colocar no Discord e encontrar seu novo Duo!'
		);
		setIsCopping(false);
	}

	return (
		<Modal animationType="fade" transparent statusBarTranslucent {...rest}>
			<View style={styles.container}>
				<View style={styles.content}>
					<TouchableOpacity
						style={styles.closeIcon}
						onPress={onClose}
					>
						<MaterialIcons
							name="close"
							size={20}
							color={THEME.COLORS.CAPTION_500}
						/>
					</TouchableOpacity>
					<CheckCircle
						size={64}
						color={THEME.COLORS.SUCCESS}
						weight="bold"
					/>
					<Heading
						title="Let's play!"
						subtitle="Agora é só começar a jogar!"
						style={{ alignItems: 'center', marginTop: 24 }}
					/>

					<Text style={styles.label}>Adicione no Discord</Text>

					<TouchableOpacity
						style={styles.discordButton}
						onPress={handleCopyDiscordUserToClipboard}
						disabled={isCopping}
					>
						<Text style={styles.discord}>{isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
