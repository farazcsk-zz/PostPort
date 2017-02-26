import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './map.style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;

const slideHeight = viewportHeight * 0.4;
const slideWidth = viewportWidth - (2 * ITEM_SPACING) - (2 * ITEM_PREVIEW);

export const sliderWidth = viewportWidth;
export const itemHorizontalMargin = ITEM_SPACING / 2;
export const itemWidth = slideWidth + (itemHorizontalMargin * 2);

const entryBorderRadius = 0;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: colors.black,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height:
      entryBorderRadius,
    backgroundColor: 'white' },
  radiusMaskEven: {
    backgroundColor: colors.black },
  textContainer: { justifyContent:
          'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius:
          entryBorderRadius },
  textContainerEven: { backgroundColor:
            colors.black },
  title: { color: colors.black,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5 },
  titleEven: { color:
                'white' },
  subtitle: { marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: 'italic' },
  subtitleEven: { color: 'rgba(255, 255, 255, 0.7)' } });
