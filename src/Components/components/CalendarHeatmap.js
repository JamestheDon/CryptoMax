import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, SafeAreaView, View} from 'react-native';
import Svg, {G, Rect, Text, TSpan} from 'react-native-svg';
import {
  SQUARE_SIZE,
  MONTH_LABELS,
  DAYS_IN_WEEK,
  MONTH_LABEL_GUTTER_SIZE,
  DAY_LABEL_GUTTER_SIZE,
  MILLISECONDS_IN_ONE_DAY,
  DAY_LABELS,
} from './utils/constants';
import {
  shiftDate,
  getBeginningTimeForDate,
  convertToDate,
} from './utils/helpers';
import {
  getWeekCount,
  getStartDateWithEmptyDays,
  getDayLabelCoordinates, //
  getTransformForDay, //
  getMonthLabelCoordinates,
  getTransformForWeek,
  getNumEmptyDaysAtStart,
  getSquareCoordinates,
  getTitleForIndex,
  getFillColor,
  getCountByDuplicateValues,
  getTooltipDataAttrsForIndex,
  getTooltipDataAttrsForValue,
  getHeight,
  getWidth,
} from './utils/utils';

const rectColor = ['#eeeeee', '#d6e685', '#8cc665', '#44a340', '#1e6823'];

const CalendarHeatmap = props => {
  const {
    values,
    weekdayLabels,
    gutterSize,
    horizontal,
    numDays,
    endDate,
    titleForValue,
    tooltipDataAttrs,

    onPress,
    showOutOfRangeDays,
    showMonthLabels,
    showDayLabels,
    colorArray,
  } = props;

  getValueCache = values => {
    const countedArray = getCountByDuplicateValues(values);
    return _.reduce(
      values,
      (memo, value) => {
        const date = convertToDate(value.date);
        const index = Math.floor(
          (date - getStartDateWithEmptyDays(numDays, endDate)) /
            MILLISECONDS_IN_ONE_DAY,
        );
        memo[index] = {
          value: value,
        };
        const count = _.find(countedArray, {key: memo[index].value.date});
        memo[index].countedArray = count;

        return memo;
      },
      {},
    );
  };

  useEffect(() => {
    console.log('Value Cache: ', getValueCache(values));

    setValueCache(getValueCache(values));
  }, []);

  const [valueCache, setValueCache] = useState(getValueCache(values));

  handleClick = index => {
    if (onPress) {
      console.log(index, 'hey!');
    }
  };

  renderSquare = (dayIndex, index) => {
    const indexOutOfRange =
      index < getNumEmptyDaysAtStart(numDays, endDate) ||
      index >= getNumEmptyDaysAtStart(numDays, endDate) + numDays;
    if (indexOutOfRange && !showOutOfRangeDays) {
      return null;
    }
    const [x, y] = getSquareCoordinates(dayIndex, horizontal, gutterSize);
    const fillColor = getFillColor(index, valueCache, colorArray);
    return (
      <Rect
        key={index}
        width={SQUARE_SIZE}
        height={SQUARE_SIZE}
        x={x + 15}
        y={y + 25}
        title={getTitleForIndex(index, valueCache, titleForValue)}
        onPress={() => handleClick(index)}
        fill={fillColor}
        {...getTooltipDataAttrsForIndex(index, valueCache, tooltipDataAttrs)}
      />
    );
  };

  renderWeek = weekIndex => {
    const [x, y] = getTransformForWeek(weekIndex, horizontal, gutterSize);
    return (
      <G key={weekIndex} x={x} y={y}>
        {_.range(DAYS_IN_WEEK).map(dayIndex =>
          renderSquare(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex),
        )}
      </G>
    );
  };

  renderAllWeeks = () => {
    return _.range(getWeekCount(numDays, endDate)).map(weekIndex =>
      renderWeek(weekIndex),
    );
  };

  renderDayLabels = () => {
    if (!showDayLabels) {
      return null;
    }

    return weekdayLabels.map((weekdayLabel, dayIndex) => {
      const [x, y] = getDayLabelCoordinates(dayIndex, gutterSize);
      return dayIndex & 1 ? (
        <Text fill={'black'} key={`${x}${y}`} x={x + 25} y={y}>
          {weekdayLabel}
        </Text>
      ) : null;
    });
  };

  renderMonthLabels = () => {
    if (!showMonthLabels) {
      return null;
    }
    const weekRange = _.range(getWeekCount(numDays, endDate) - 1); // don't render for last week, because label will be cut off
    return weekRange.map(weekIndex => {
      const endOfWeek = shiftDate(
        getStartDateWithEmptyDays(numDays, endDate),
        (weekIndex + 1) * DAYS_IN_WEEK,
      );
      const [x, y] = getMonthLabelCoordinates(
        weekIndex,
        horizontal,
        gutterSize,
        showMonthLabels,
      );
      return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
        <Text fill={'black'} key={weekIndex} x={x} y={y + 16}>
          {MONTH_LABELS[endOfWeek.getMonth()]}
        </Text>
      ) : null;
    });
  };

  return (
    <View>
      <Svg
        height={376}
        width={176}
        //  height={ getHeight(gutterSize, showMonthLabels, horizontal)}
        // width={ getWidth(numDays, endDate, gutterSize)}
      >
        <G>{renderMonthLabels()}</G>
        <G>{renderDayLabels()}</G>
        <G>{renderAllWeeks()}</G>
      </Svg>
    </View>
  );
};

CalendarHeatmap.propTypes = {
  values: PropTypes.arrayOf(
    // array of objects with date and arbitrary metadata
    PropTypes.shape({
      date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
      ]).isRequired,
    }).isRequired,
  ).isRequired,

  numDays: PropTypes.number, // number of days back from endDate to show
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]), // end of date range
  gutterSize: PropTypes.number, // size of space between squares
  horizontal: PropTypes.bool, // whether to orient horizontally or vertically
  showMonthLabels: PropTypes.bool, // whether to show month labels
  showDayLabels: PropTypes.bool, // whether to show day labels
  showOutOfRangeDays: PropTypes.bool, // whether to render squares for extra days in week after endDate, and before start date
  weekdayLabels: PropTypes.arrayOf(PropTypes.string),
  tooltipDataAttrs: PropTypes.oneOfType([PropTypes.object, PropTypes.func]), // data attributes to add to square for setting 3rd party tooltips, e.g. { 'data-toggle': 'tooltip' } for bootstrap tooltips
  titleForValue: PropTypes.func, // function which returns title text for value
  classForValue: PropTypes.func, // function which returns html class for value
  onPress: PropTypes.func, // callback function when a square is clicked
  colorArray: PropTypes.array,
};

CalendarHeatmap.defaultProps = {
  showDayLabels: true,
  // numDays: 366,
  // endDate: new Date('2021-01-01'),
  gutterSize: 1,
  weekdayLabels: DAY_LABELS,
  horizontal: false,
  showMonthLabels: true,
  showOutOfRangeDays: false,
  colorArray: rectColor,
  classForValue: value => (value ? 'black' : '#8cc665'),
  // onPress: () => console.log("change onPress prop")
};

export default CalendarHeatmap;
