// @flow
import React, { PureComponent } from "react";
import { Image, Linking, View, StyleSheet } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import ContactDetails from "./ContactDetails";
import EventOverview from "./EventOverview";
import EventDescription from "./EventDescription";
import EventMap from "./EventMap";
import Text from "../../components/Text";
import ButtonPrimary from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import ShadowedScrollView from "../../components/ShadowedScrollView";
import SectionDivider from "./SectionDivider";
import { whiteColor, darkBlueGreyTwoColor } from "../../constants/colors";
import text from "../../constants/text";
import type { Event, LocalizedFieldRef } from "../../data/event";
import locale from "../../data/locale";
import chevronLeftWhite from "../../../assets/images/chevron-left-white.png";
import heartWhite from "../../../assets/images/heart-white.png";

type Props = {
  navigation: NavigationScreenProp<{ params: { eventId: string } }>,
  event: Event,
  getAssetUrl: LocalizedFieldRef => string
};

export const AccessibilityDetails = ({ event }: { event: Event }) => (
  <View>
    <Text type="h2" color="lightNavyBlueColor" style={styles.title}>
      {text.eventDetailsAccessibilityDetails}
    </Text>
    <View style={styles.accessibilityDetailsItem}>
      <Text>{event.fields.accessibilityDetails[locale]}</Text>
    </View>
  </View>
);

export const BuyTickets = ({ event }: { event: Event }) => (
  <ContentPadding style={styles.buyButton}>
    <ButtonPrimary
      onPress={() => Linking.openURL(event.fields.ticketingUrl[locale])}
    >
      {text.eventDetailsBuyButton}
    </ButtonPrimary>
  </ContentPadding>
);

class EventDetailsScreen extends PureComponent<Props> {
  static defaultProps = {};

  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

  render() {
    const { event, getAssetUrl } = this.props;
    return (
      <View style={styles.container}>
        <Header backgroundColor={darkBlueGreyTwoColor}>
          <ContentPadding style={styles.headerContent}>
            <IconButton
              accessibilityLabel="Back"
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
              source={chevronLeftWhite}
            />
            <IconButton
              accessibilityLabel="Favourite"
              onPress={() => {}}
              source={heartWhite}
            />
          </ContentPadding>
        </Header>
        <ShadowedScrollView topShadow={false}>
          <Image
            style={{ aspectRatio: 5 / 3 }}
            source={{ uri: getAssetUrl(event.fields.individualEventPicture) }}
          />
          <ContentPadding style={styles.content}>
            <EventOverview event={event} />
            <SectionDivider />
            <EventDescription event={event} />
            <View style={styles.map}>
              <EventMap
                lat={event.fields.location[locale].lat}
                lon={event.fields.location[locale].lon}
                locationName={event.fields.locationName[locale]}
              />
            </View>
            {event.fields.accessibilityDetails && [
              <SectionDivider key="a1" />,
              <AccessibilityDetails event={event} key="a2" />
            ]}
            {(event.fields.email || event.fields.phone) && [
              <SectionDivider key="b1" />,
              <ContactDetails
                email={event.fields.email[locale]}
                phone={event.fields.phone[locale]}
                key="b2"
              />
            ]}
          </ContentPadding>
        </ShadowedScrollView>
        {event.fields.ticketingUrl && <BuyTickets event={event} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor
  },
  content: {
    marginBottom: 24
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    marginTop: 8,
    marginBottom: 4
  },
  accessibilityDetailsItem: {
    marginTop: 8
  },
  buyButton: {
    backgroundColor: whiteColor,
    paddingVertical: 12
  },
  map: {
    marginTop: 8
  }
});

export default EventDetailsScreen;
