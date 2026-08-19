/* Quickfire cards — pandas: dates, times and time series. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var DT = 'pandas · dates & times';
  var TS = 'pandas · time series';

  window.SNIPPETS.push(

    { id: 'pd-dt-year', group: DT, lvl: 1,
      ask: 'Extract the year from the datetime column "date"',
      a: "df['date'].dt.year",
      note: 'The .dt accessor is to datetimes what .str is to text.' },

    { id: 'pd-dt-month', group: DT, lvl: 1,
      ask: 'Extract the month number from "date"',
      a: "df['date'].dt.month",
      note: '.dt.month_name() gives "January" instead of 1.' },

    { id: 'pd-dt-day', group: DT, lvl: 1,
      ask: 'Extract the day of the month from "date"',
      a: "df['date'].dt.day" },

    { id: 'pd-dt-dayname', group: DT, lvl: 2,
      ask: 'Get the weekday name (Monday, Tuesday…) from "date"',
      a: "df['date'].dt.day_name()",
      note: '.dt.dayofweek gives the number, Monday = 0.' },

    { id: 'pd-dt-dow', group: DT, lvl: 2,
      ask: 'Get the day of the week as a number from "date"',
      a: "df['date'].dt.dayofweek",
      note: 'Monday is 0, Sunday is 6 — so >= 5 means weekend.' },

    { id: 'pd-dt-hour', group: DT, lvl: 2,
      ask: 'Extract the hour from the timestamp column "ts"',
      a: "df['ts'].dt.hour" },

    { id: 'pd-dt-date', group: DT, lvl: 2,
      ask: 'Get just the calendar date (no time) from the timestamp "ts"',
      a: "df['ts'].dt.date",
      note: 'Gives Python date objects; .dt.normalize() keeps it a datetime at midnight.' },

    { id: 'pd-dt-quarter', group: DT, lvl: 2,
      ask: 'Get the calendar quarter of "date"',
      a: "df['date'].dt.quarter" },

    { id: 'pd-dt-period', group: DT, lvl: 3,
      ask: 'Turn "date" into a monthly period for grouping',
      a: "df['date'].dt.to_period('M')",
      note: 'Cleaner than a year+month string when you want to group by month.' },

    { id: 'pd-dt-strftime', group: DT, lvl: 2,
      ask: 'Format "date" as the string YYYY-MM',
      a: "df['date'].dt.strftime('%Y-%m')",
      note: 'strftime returns text — good for labels, bad for sorting anything but ISO order.' },

    { id: 'pd-now', group: DT, lvl: 1,
      ask: 'Get the current timestamp with pandas',
      a: 'pd.Timestamp.now()',
      alts: ['pd.Timestamp.today()'],
      note: 'datetime.now() from the standard library does the same job.' },

    { id: 'pd-timestamp', group: DT, lvl: 2,
      ask: 'Make a single pandas Timestamp for 1 January 2024',
      a: "pd.Timestamp('2024-01-01')" },

    { id: 'pd-date-range', group: DT, lvl: 2,
      ask: 'Build a range of 30 daily dates starting 1 January 2024',
      a: "pd.date_range('2024-01-01', periods=30, freq='D')",
      note: 'freq takes D, W, M, MS, H, min… end= can replace periods=.' },

    { id: 'pd-date-diff', group: DT, lvl: 2,
      ask: 'Number of days between the "end" and "start" date columns',
      a: "(df['end'] - df['start']).dt.days",
      note: 'Subtracting datetimes gives a Timedelta; .dt.days pulls out the whole days.' },

    { id: 'pd-timedelta', group: DT, lvl: 2,
      ask: 'Add 7 days to every value in "date"',
      a: "df['date'] + pd.Timedelta(days=7)",
      alts: ["df['date'] + pd.to_timedelta(7, unit='D')"],
      note: 'pd.DateOffset(months=1) is the calendar-aware version for months and years.' },

    { id: 'pd-age-years', group: DT, lvl: 3,
      ask: 'Days since "date" as of today',
      a: "(pd.Timestamp.now() - df['date']).dt.days",
      note: 'Divide by 365.25 for a rough age in years.' },

    { id: 'pd-dt-tz', group: DT, lvl: 3,
      ask: 'Attach the UTC timezone to a naive datetime column "ts"',
      a: "df['ts'].dt.tz_localize('UTC')",
      note: 'localize labels a naive time; tz_convert moves an aware one to another zone.' },

    { id: 'pd-dt-tzconv', group: DT, lvl: 3,
      ask: 'Convert the timezone-aware "ts" column to Europe/London',
      a: "df['ts'].dt.tz_convert('Europe/London')" },

    /* ---- time series operations ---- */
    { id: 'pd-set-dtindex', group: TS, lvl: 2,
      ask: 'Make "date" the index so time-series methods work',
      a: "df = df.set_index('date')",
      note: 'resample, rolling on time windows and .loc[\'2024\'] all need a DatetimeIndex.' },

    { id: 'pd-resample-month', group: TS, lvl: 2,
      ask: 'Total "amount" per month from a date-indexed frame',
      a: "df['amount'].resample('M').sum()",
      alts: ["df['amount'].resample('ME').sum()"],
      note: 'resample is groupby for time. M = month end, MS = month start, W = week.' },

    { id: 'pd-resample-day', group: TS, lvl: 2,
      ask: 'Daily mean of "value" from a timestamp-indexed frame',
      a: "df['value'].resample('D').mean()" },

    { id: 'pd-rolling-mean', group: TS, lvl: 2,
      ask: '7-period moving average of "value"',
      a: "df['value'].rolling(7).mean()",
      alts: ["df['value'].rolling(window=7).mean()"],
      note: 'The first 6 values come back NaN — the window is not full yet.' },

    { id: 'pd-rolling-min-periods', group: TS, lvl: 3,
      ask: '7-period moving average of "value" that starts producing numbers immediately',
      a: "df['value'].rolling(7, min_periods=1).mean()",
      note: 'min_periods=1 fills the warm-up window with a partial average.' },

    { id: 'pd-rolling-sum', group: TS, lvl: 2,
      ask: 'Rolling 30-period sum of "amount"',
      a: "df['amount'].rolling(30).sum()" },

    { id: 'pd-expanding', group: TS, lvl: 3,
      ask: 'Cumulative (expanding) mean of "value" from the start of the series',
      a: "df['value'].expanding().mean()",
      note: 'Expanding = a window that grows; rolling = a window that slides.' },

    { id: 'pd-ewm', group: TS, lvl: 3,
      ask: 'Exponentially weighted moving average of "value" with span 10',
      a: "df['value'].ewm(span=10).mean()",
      note: 'Recent points matter more — smoother than a flat moving average.' },

    { id: 'pd-shift', group: TS, lvl: 2,
      ask: 'Get the previous row\'s "value" alongside the current one',
      a: "df['value'].shift(1)",
      note: 'shift(-1) looks ahead — which in a model is leakage.' },

    { id: 'pd-diff', group: TS, lvl: 2,
      ask: 'Change in "value" from one row to the next',
      a: "df['value'].diff()",
      alts: ["df['value'] - df['value'].shift(1)"],
      note: 'diff() is shift-and-subtract in one call.' },

    { id: 'pd-pct-change', group: TS, lvl: 2,
      ask: 'Percentage change in "value" from row to row',
      a: "df['value'].pct_change()",
      note: 'Returns a fraction: 0.05 means +5%.' },

    { id: 'pd-lag-group', group: TS, lvl: 3,
      ask: 'Previous "value" within each "customer_id", not across customers',
      a: "df.groupby('customer_id')['value'].shift(1)",
      note: 'Always shift inside the group — otherwise one customer\'s history leaks into the next.' },

    { id: 'pd-loc-year', group: TS, lvl: 3,
      ask: 'Select every row from 2024 on a date-indexed frame',
      a: "df.loc['2024']",
      note: 'Partial-string indexing: \'2024-03\' narrows it to a month, and slices work too.' },

    { id: 'pd-loc-daterange', group: TS, lvl: 3,
      ask: 'Select rows between 1 March and 30 June 2024 on a date-indexed frame',
      a: "df.loc['2024-03-01':'2024-06-30']",
      note: 'Both ends are included on a DatetimeIndex slice.' },

    { id: 'pd-asfreq', group: TS, lvl: 3,
      ask: 'Reindex a date-indexed frame to every calendar day, leaving gaps as NaN',
      a: "df.asfreq('D')",
      note: 'The honest way to expose missing days before you fill them.' },

    { id: 'pd-between-time', group: TS, lvl: 3,
      ask: 'Keep only rows timestamped between 09:00 and 17:00',
      a: "df.between_time('09:00', '17:00')",
      note: 'Works on a DatetimeIndex — business-hours filtering in one call.' },

    { id: 'pd-sortdate', group: TS, lvl: 1,
      ask: 'Sort df into date order using the "date" column',
      a: "df = df.sort_values('date')",
      note: 'Do this before any shift, diff or rolling — they trust the row order blindly.' }
  );
})();
