import {
  Document,
  Page,
  StyleSheet,
  Text,
  Image,
  View,
} from '@react-pdf/renderer';
import logo from '@/assets/images/icon.png';

export default function Flyer({ picture, name, status, gender, qrCode }) {
  const flyerStyles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Helvetica',
      position: 'absolute',
      padding: '1in',
    },
    title: {
      fontSize: 64,
      color: '#333',
      fontWeight: 700,
      paddingBottom: '.25in',
    },
    link: {
      flexDirection: 'row',
      height: '2in',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    linkText: {
      flex: 1,
      textAlign: 'center',
    },
    linkURL: {
      fontWeight: 700,
    },
    qr: {
      flexShrink: 0,
      aspectRatio: '1/1',
    },
    image: {
      height: '5in',
      width: '100%',
      objectFit: 'contain',
    },
    watermarkWrapper: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      fontSize: 12,
      height: '0.25in',
    },
  });

  return (
    <Document>
      <Page size="LETTER" style={flyerStyles.page}>
        <Text style={flyerStyles.title}>LOST PET</Text>
        <Image src={picture} style={flyerStyles.image} />
        <View style={flyerStyles.link}>
          <View style={flyerStyles.linkText}>
            <Text wrap={true}>
              {status?.toLowerCase() == 'lost'
                ? `This is ${name || 'our pet'}, we cannot find ${gender?.toLowerCase() === 'male' ? 'him' : gender?.toLowerCase() === 'female' ? 'her' : 'them'} and we need your help. If you find ${name || 'this pet'}, please let me know by either scanning the QR code or by going to`
                : `I found this pet${name && `, ${name},`} and am hoping to find ${gender?.toLowerCase() === 'male' ? 'his' : gender?.toLowerCase() === 'female' ? 'her' : 'their'} owner. If you know ${name || 'this pet'}'s owner, please let me know by either scanning the QR code or by going to`}
            </Text>
            <Text style={flyerStyles.linkURL} wrap={false}>
              github.com/AdamByersDev/lost-tails/
            </Text>
          </View>
          <Image src={qrCode} style={flyerStyles.qr} />
        </View>
        <View style={flyerStyles.watermarkWrapper}>
          <Image src={logo} />
          <Text>Flyer generated with Lostails</Text>
        </View>
      </Page>
    </Document>
  );
}
