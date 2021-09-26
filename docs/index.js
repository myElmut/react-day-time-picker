import React, { useState } from 'react';
import { render } from 'react-dom';

import { Main, Footer } from './components/Layout';

import {
  Article,
  Header,
  Title,
  ByLine,
  SubTitle,
  Interactive,
  Caption
} from './components/Article';

import { CodeBlock, InlineCode } from './components/CodeBlock';
import { TableWrapper, Table, TH, TD } from './components/Table';
import { Container, DarkContainer } from './components/Container';

import { fakeRequest } from './request';
import { timeSlotValidator } from './validators';
import theme from './theme';

import {
  codeExample1,
  codeExample2,
  codeExample3,
  codeExample4,
  codeExample5,
  codeExample6,
  codeExample7,
  codeExample8
} from './code-examples';

import DayTimePicker from '../src';

function App() {
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleErr, setScheduleErr] = useState('');

  const slots = [
    {
      slotCode: '6212',
      slotStatus: 'O',
      deliveryDate: '2021-09-25T18:00:00.000+02:00',
      startHour: '19',
      endHour: '21',
      rank: '1',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4212',
      slotStatus: 'O',
      deliveryDate: '2021-09-30T18:00:00.000+02:00',
      startHour: '19',
      endHour: '21',
      rank: '35',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4213',
      slotStatus: 'O',
      deliveryDate: '2021-09-30T18:00:00.000+02:00',
      startHour: '20',
      endHour: '22',
      rank: '36',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4202',
      slotStatus: 'O',
      deliveryDate: '2021-09-30T18:00:00.000+02:00',
      startHour: '9',
      endHour: '11',
      rank: '37',
      tariffLevel: 'N3'
    },
    {
      slotCode: '4203',
      slotStatus: 'O',
      deliveryDate: '2021-09-30T18:00:00.000+02:00',
      startHour: '10',
      endHour: '12',
      rank: '38',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4204',
      slotStatus: 'O',
      deliveryDate: '2021-09-30T18:00:00.000+02:00',
      startHour: '11',
      endHour: '13',
      rank: '39',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4205',
      slotStatus: 'O',
      deliveryDate: '2021-09-30T18:00:00.000+02:00',
      startHour: '12',
      endHour: '14',
      rank: '40',
      tariffLevel: 'N2'
    },
    {
      slotCode: '4206',
      slotStatus: 'O',
      deliveryDate: '2021-09-30T18:00:00.000+02:00',
      startHour: '13',
      endHour: '15',
      rank: '41',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4207',
      slotStatus: 'O',
      deliveryDate: '2021-09-30T18:00:00.000+02:00',
      startHour: '14',
      endHour: '16',
      rank: '42',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4208',
      slotStatus: 'O',
      deliveryDate: '2021-09-30T18:00:00.000+02:00',
      startHour: '15',
      endHour: '17',
      rank: '43',
      tariffLevel: 'N4'
    },
    {
      slotCode: '4209',
      slotStatus: 'O',
      deliveryDate: '2021-09-30T18:00:00.000+02:00',
      startHour: '16',
      endHour: '18',
      rank: '44',
      tariffLevel: 'N3'
    },
    {
      slotCode: '4211',
      slotStatus: 'O',
      deliveryDate: '2021-09-30T18:00:00.000+02:00',
      startHour: '18',
      endHour: '20',
      rank: '45',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5212',
      slotStatus: 'O',
      deliveryDate: '2021-10-01T18:00:00.000+02:00',
      startHour: '19',
      endHour: '21',
      rank: '46',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5213',
      slotStatus: 'O',
      deliveryDate: '2021-10-01T18:00:00.000+02:00',
      startHour: '20',
      endHour: '22',
      rank: '47',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5202',
      slotStatus: 'O',
      deliveryDate: '2021-10-01T18:00:00.000+02:00',
      startHour: '9',
      endHour: '11',
      rank: '48',
      tariffLevel: 'N3'
    },
    {
      slotCode: '5203',
      slotStatus: 'O',
      deliveryDate: '2021-10-01T18:00:00.000+02:00',
      startHour: '10',
      endHour: '12',
      rank: '49',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5204',
      slotStatus: 'O',
      deliveryDate: '2021-10-01T18:00:00.000+02:00',
      startHour: '11',
      endHour: '13',
      rank: '50',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5205',
      slotStatus: 'O',
      deliveryDate: '2021-10-01T18:00:00.000+02:00',
      startHour: '12',
      endHour: '14',
      rank: '51',
      tariffLevel: 'N2'
    },
    {
      slotCode: '5206',
      slotStatus: 'O',
      deliveryDate: '2021-10-01T18:00:00.000+02:00',
      startHour: '13',
      endHour: '15',
      rank: '52',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5207',
      slotStatus: 'O',
      deliveryDate: '2021-10-01T18:00:00.000+02:00',
      startHour: '14',
      endHour: '16',
      rank: '53',
      tariffLevel: 'N2'
    },
    {
      slotCode: '5208',
      slotStatus: 'O',
      deliveryDate: '2021-10-01T18:00:00.000+02:00',
      startHour: '15',
      endHour: '17',
      rank: '54',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5209',
      slotStatus: 'O',
      deliveryDate: '2021-10-01T18:00:00.000+02:00',
      startHour: '16',
      endHour: '18',
      rank: '55',
      tariffLevel: 'N3'
    },
    {
      slotCode: '5211',
      slotStatus: 'O',
      deliveryDate: '2021-10-01T18:00:00.000+02:00',
      startHour: '18',
      endHour: '20',
      rank: '56',
      tariffLevel: 'N1'
    },
    {
      slotCode: '6206',
      slotStatus: 'O',
      deliveryDate: '2021-10-02T18:00:00.000+02:00',
      startHour: '13',
      endHour: '15',
      rank: '57',
      tariffLevel: 'N1'
    },
    {
      slotCode: '6207',
      slotStatus: 'O',
      deliveryDate: '2021-10-02T18:00:00.000+02:00',
      startHour: '14',
      endHour: '16',
      rank: '58',
      tariffLevel: 'N3'
    },
    {
      slotCode: '6208',
      slotStatus: 'O',
      deliveryDate: '2021-10-02T18:00:00.000+02:00',
      startHour: '15',
      endHour: '17',
      rank: '59',
      tariffLevel: 'N2'
    },
    {
      slotCode: '6209',
      slotStatus: 'O',
      deliveryDate: '2021-10-02T18:00:00.000+02:00',
      startHour: '16',
      endHour: '18',
      rank: '60',
      tariffLevel: 'N4'
    },
    {
      slotCode: '6211',
      slotStatus: 'O',
      deliveryDate: '2021-10-02T18:00:00.000+02:00',
      startHour: '18',
      endHour: '20',
      rank: '61',
      tariffLevel: 'N1'
    },
    {
      slotCode: '6212',
      slotStatus: 'O',
      deliveryDate: '2021-10-02T18:00:00.000+02:00',
      startHour: '19',
      endHour: '21',
      rank: '62',
      tariffLevel: 'N1'
    },
    {
      slotCode: '6202',
      slotStatus: 'O',
      deliveryDate: '2021-10-02T18:00:00.000+02:00',
      startHour: '9',
      endHour: '11',
      rank: '63',
      tariffLevel: 'N4'
    },
    {
      slotCode: '6203',
      slotStatus: 'O',
      deliveryDate: '2021-10-02T18:00:00.000+02:00',
      startHour: '10',
      endHour: '12',
      rank: '64',
      tariffLevel: 'N1'
    },
    {
      slotCode: '6204',
      slotStatus: 'O',
      deliveryDate: '2021-10-02T18:00:00.000+02:00',
      startHour: '11',
      endHour: '13',
      rank: '65',
      tariffLevel: 'N1'
    },
    {
      slotCode: '6205',
      slotStatus: 'O',
      deliveryDate: '2021-10-02T18:00:00.000+02:00',
      startHour: '12',
      endHour: '14',
      rank: '66',
      tariffLevel: 'N2'
    },
    {
      slotCode: '4212',
      slotStatus: 'O',
      deliveryDate: '2021-10-07T18:00:00.000+02:00',
      startHour: '19',
      endHour: '21',
      rank: '100',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4213',
      slotStatus: 'O',
      deliveryDate: '2021-10-07T18:00:00.000+02:00',
      startHour: '20',
      endHour: '22',
      rank: '101',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4202',
      slotStatus: 'O',
      deliveryDate: '2021-10-07T18:00:00.000+02:00',
      startHour: '9',
      endHour: '11',
      rank: '102',
      tariffLevel: 'N3'
    },
    {
      slotCode: '4203',
      slotStatus: 'O',
      deliveryDate: '2021-10-07T18:00:00.000+02:00',
      startHour: '10',
      endHour: '12',
      rank: '103',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4204',
      slotStatus: 'O',
      deliveryDate: '2021-10-07T18:00:00.000+02:00',
      startHour: '11',
      endHour: '13',
      rank: '104',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4205',
      slotStatus: 'O',
      deliveryDate: '2021-10-07T18:00:00.000+02:00',
      startHour: '12',
      endHour: '14',
      rank: '105',
      tariffLevel: 'N2'
    },
    {
      slotCode: '4206',
      slotStatus: 'O',
      deliveryDate: '2021-10-07T18:00:00.000+02:00',
      startHour: '13',
      endHour: '15',
      rank: '106',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4207',
      slotStatus: 'O',
      deliveryDate: '2021-10-07T18:00:00.000+02:00',
      startHour: '14',
      endHour: '16',
      rank: '107',
      tariffLevel: 'N1'
    },
    {
      slotCode: '4208',
      slotStatus: 'O',
      deliveryDate: '2021-10-07T18:00:00.000+02:00',
      startHour: '15',
      endHour: '17',
      rank: '108',
      tariffLevel: 'N4'
    },
    {
      slotCode: '4209',
      slotStatus: 'O',
      deliveryDate: '2021-10-07T18:00:00.000+02:00',
      startHour: '16',
      endHour: '18',
      rank: '109',
      tariffLevel: 'N3'
    },
    {
      slotCode: '4211',
      slotStatus: 'O',
      deliveryDate: '2021-10-07T18:00:00.000+02:00',
      startHour: '18',
      endHour: '20',
      rank: '110',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5212',
      slotStatus: 'O',
      deliveryDate: '2021-10-08T18:00:00.000+02:00',
      startHour: '19',
      endHour: '21',
      rank: '111',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5213',
      slotStatus: 'O',
      deliveryDate: '2021-10-08T18:00:00.000+02:00',
      startHour: '20',
      endHour: '22',
      rank: '112',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5202',
      slotStatus: 'O',
      deliveryDate: '2021-10-08T18:00:00.000+02:00',
      startHour: '9',
      endHour: '11',
      rank: '113',
      tariffLevel: 'N3'
    },
    {
      slotCode: '5203',
      slotStatus: 'O',
      deliveryDate: '2021-10-08T18:00:00.000+02:00',
      startHour: '10',
      endHour: '12',
      rank: '114',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5204',
      slotStatus: 'O',
      deliveryDate: '2021-10-08T18:00:00.000+02:00',
      startHour: '11',
      endHour: '13',
      rank: '115',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5205',
      slotStatus: 'O',
      deliveryDate: '2021-10-08T18:00:00.000+02:00',
      startHour: '12',
      endHour: '14',
      rank: '116',
      tariffLevel: 'N2'
    },
    {
      slotCode: '5206',
      slotStatus: 'O',
      deliveryDate: '2021-10-08T18:00:00.000+02:00',
      startHour: '13',
      endHour: '15',
      rank: '117',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5207',
      slotStatus: 'O',
      deliveryDate: '2021-10-08T18:00:00.000+02:00',
      startHour: '14',
      endHour: '16',
      rank: '118',
      tariffLevel: 'N2'
    },
    {
      slotCode: '5208',
      slotStatus: 'O',
      deliveryDate: '2021-10-08T18:00:00.000+02:00',
      startHour: '15',
      endHour: '17',
      rank: '119',
      tariffLevel: 'N1'
    },
    {
      slotCode: '5209',
      slotStatus: 'O',
      deliveryDate: '2021-10-08T18:00:00.000+02:00',
      startHour: '16',
      endHour: '18',
      rank: '120',
      tariffLevel: 'N3'
    },
    {
      slotCode: '5211',
      slotStatus: 'O',
      deliveryDate: '2021-10-08T18:00:00.000+02:00',
      startHour: '18',
      endHour: '20',
      rank: '121',
      tariffLevel: 'N1'
    }
  ];

  const handleScheduled = date => {
    setIsScheduling(true);
    setScheduleErr('');

    fakeRequest(date)
      .then(json => {
        setScheduleErr('');
        setIsScheduled(true);
        console.log('fake response: ', json); // eslint-disable-line no-console
      })
      .catch(err => {
        setScheduleErr(err);
      })
      .finally(() => {
        setIsScheduling(false);
      });
  };

  return (
    <Main>
      <Article>
        <Header>
          <Title>React Day Time Picker</Title>

          <ByLine>
            View on{' '}
            <a
              href="https://github.com/mooncake-dev/react-day-time-picker"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </ByLine>
        </Header>

        <p>A React component to help with scheduling a day and time.</p>

        <ul>
          <li>
            <a href="#installation">Installation</a>
          </li>

          <li>
            <a href="#design-decisions">Design decisions</a>
          </li>

          <li>
            <a href="#api">API</a>
          </li>

          <li>
            <a href="#basic-usage">Basic usage</a>

            <ul>
              <li>
                <a href="#rendering-the-component">Rendering the component</a>
              </li>

              <li>
                <a href="#setting-a-time-slot-size">Setting a time slot size</a>
              </li>

              <li>
                <a href="#getting-the-scheduled-day-and-time">
                  Getting the scheduled day and time
                </a>
              </li>

              <li>
                <a href="#showing-scheduling-feedback">
                  Showing scheduling feedback
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#advanced-usage">Advanced usage</a>

            <ul>
              <li>
                <a href="#using-the-time-slot-validator">
                  Using the time slot validator
                </a>
              </li>

              <li>
                <a href="#theming">Theming</a>
              </li>
            </ul>
          </li>
        </ul>

        <SubTitle>Installation</SubTitle>

        <CodeBlock
          codeString="npm i @mooncake-dev/react-day-time-picker"
          lang="shell"
        />

        <p>
          <i>
            Note that there&apos;s a peer dependency requirement on{' '}
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            .
          </i>
        </p>

        <SubTitle>Design decisions</SubTitle>

        <p>
          This component <b>does not allow</b> a user to pick <i>past</i> days
          and times.
        </p>

        <p>
          Past months and days can be viewed, but can <b>not</b> be selected by
          the user.
        </p>

        <p>
          Past time slots will <b>not</b> be rendered at all.
        </p>

        <SubTitle>API</SubTitle>

        <p>The following props are exposed:</p>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TH>Name</TH>
                <TH>Type</TH>
                <TH>Required</TH>
                <TH>Default</TH>
                <TH>Description</TH>
              </tr>
            </thead>

            <tbody>
              <tr>
                <TD alignLeft>
                  <InlineCode>timeSlotSizeMinutes</InlineCode>
                </TD>
                <TD>Number</TD>
                <TD>Yes</TD>
                <TD>-</TD>
                <TD alignLeft>
                  The{' '}
                  <a href="#setting-a-time-slot-size">size of the time slots</a>{' '}
                  a user can pick, after picking a day.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>isLoading</InlineCode>
                </TD>
                <TD>Boolean</TD>
                <TD>Yes</TD>
                <TD>-</TD>
                <TD alignLeft>
                  If the <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode>{' '}
                  component is loading or not.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>isDone</InlineCode>
                </TD>
                <TD>Boolean</TD>
                <TD>Yes</TD>
                <TD>-</TD>
                <TD alignLeft>
                  If the <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode>{' '}
                  component is done scheduling or not.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>err</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>Yes</TD>
                <TD>-</TD>
                <TD alignLeft>
                  Any error that occured while scheduling, and the{' '}
                  <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode>{' '}
                  component should show.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>onConfirm</InlineCode>
                </TD>
                <TD>Function</TD>
                <TD>Yes</TD>
                <TD>-</TD>
                <TD alignLeft>
                  Handler function that is called when a user clicks the
                  schedule button, after picking a day and time.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>confirmText</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>No</TD>
                <TD>Schedule</TD>
                <TD alignLeft>Custom text to show in the schedule button.</TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>loadingText</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>No</TD>
                <TD>Scheduling..</TD>
                <TD alignLeft>Custom text to show during loading.</TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>doneText</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>No</TD>
                <TD>Your event has been scheduled!</TD>
                <TD alignLeft>Custom text to show when scheduling is done.</TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>timeSlotValidator</InlineCode>
                </TD>
                <TD>Function</TD>
                <TD>No</TD>
                <TD>-</TD>
                <TD alignLeft>
                  A validator function to determine if a time slot can be picked
                  by the user or not.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>theme</InlineCode>
                </TD>
                <TD>Object</TD>
                <TD>No</TD>
                <TD>-</TD>
                <TD alignLeft>
                  Contains <a href="#theming">theme properties</a> to customize
                  the look of the{' '}
                  <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode>{' '}
                  component.
                </TD>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <SubTitle>Basic usage</SubTitle>

        <SubTitle level={2}>Rendering the component</SubTitle>

        <p>
          To get an impression of the{' '}
          <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode> component, you
          can render it by providing the{' '}
          <InlineCode>timeSlotSizeMinutes</InlineCode> prop:
        </p>

        <CodeBlock codeString={codeExample1} lang="jsx" />

        <p>
          This will render a basic calendar, where a day and time can be picked
          by the user:
        </p>

        <Interactive>
          <DayTimePicker timeSlotSizeMinutes={60} />

          <Caption>
            Go ahead and click around, but it&apos;s a semi-functional
            component. Clicking the schedule button doesn&apos;t do anything,
            because not all required props are passed yet.
          </Caption>
        </Interactive>

        <p>
          The <InlineCode>timeSlotSizeMinutes</InlineCode> prop
          &quot;splits&quot; a day into as many slots as &quot;fit&quot; in that
          day. Learn more in{' '}
          <a href="#setting-a-time-slot-size">setting a time slot size</a>.
        </p>

        <p>
          You can style the{' '}
          <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode> component by
          wrapping it in a container. This will also allow you to render any
          additional information next to it (like a header):
        </p>

        <CodeBlock codeString={codeExample2} lang="jsx" />

        <Interactive>
          <Container>
            <h3>Pick a Day and Time</h3>

            <DayTimePicker timeSlotSizeMinutes={15} />
          </Container>
        </Interactive>

        <p>
          More advanced <a href="#theming">theming</a> options are available to
          further customize how the{' '}
          <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode> looks.
        </p>

        <p>
          Read ahead to learn how to get the picked day and time, after a user
          clicks on the schedule button.
        </p>

        <SubTitle level={2}>Setting a time slot size</SubTitle>

        <p>
          After a user picks a day, they will be able to pick a time. You can
          control from how many time slots a user can pick, by changing the the{' '}
          <InlineCode>timeSlotSizeMinutes</InlineCode> prop.
        </p>

        <p>
          The <InlineCode>timeSlotSizeMinutes</InlineCode> prop
          &quot;splits&quot; a day into as many time slots as &quot;fit&quot; in
          that day.
        </p>

        <p>
          For example, if the <InlineCode>timeSlotSizeMinutes</InlineCode> is
          set to <InlineCode>60</InlineCode> minutes, 24 time slots will be
          generated for a &quot;full&quot; day (from 00:00 to 23:00).
        </p>

        <p>
          But if the current time is 13:31, only 10 time slots will be generated
          in the same day (from 14:00 to 23:00). Because the time is
          &quot;padded&quot; to the next available time slot in the present
          (excluding time slots in the past).
        </p>

        <p>
          More advanced options are available to control which time slots a user
          can pick, by{' '}
          <a href="#using-the-time-slot-validator">
            using the time slot validator
          </a>
        </p>

        <SubTitle level={2}>Getting the scheduled day and time</SubTitle>

        <p>
          You can &quot;hook into&quot; the confirmation event (when a user
          schedules the day and time) by passing a handler function as the{' '}
          <InlineCode>onConfirm</InlineCode> prop.
        </p>

        <p>
          The handler function is called by the{' '}
          <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode> component when a
          user clicks the schedule button. The handler is called with a{' '}
          <InlineCode>Date</InlineCode> Object, which represents the picked day
          and time.
        </p>

        <p>
          This is useful if you want to do something with the picked day and
          time. Like sending it to an API or dispatching it to your application
          store.
        </p>

        <CodeBlock codeString={codeExample3} lang="jsx" />

        <SubTitle level={2}>Showing scheduling feedback</SubTitle>

        <p>
          When a user clicks on the schedule button, you can give them feedback
          about the scheduling process by tracking the following state:
        </p>

        <ul>
          <li>
            <InlineCode>isScheduling</InlineCode>: if the{' '}
            <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode> component is
            loading or not (like when making an HTTP request).
          </li>

          <li>
            <InlineCode>isScheduled</InlineCode>: if the{' '}
            <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode> component is
            done scheduling or not (like when an HTTP request was successful).
          </li>

          <li>
            <InlineCode>scheduleErr</InlineCode>: any error that occured while
            scheduling, and the{' '}
            <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode> component
            should show (like when an HTTP request failed).
          </li>
        </ul>

        <CodeBlock codeString={codeExample4} lang="jsx" />

        <p>
          You can simulate making an HTTP request with a function like this:
        </p>

        <CodeBlock codeString={codeExample5} lang="js" />

        <p>
          You can then call it from the <InlineCode>onConfirm</InlineCode>{' '}
          handler, where the state properties must be updated to reflect the
          stage in the scheduling process:
        </p>

        <CodeBlock codeString={codeExample6} lang="jsx" />

        <Interactive>
          <Container>
            <h3>Pick a Day and Time</h3>

            <DayTimePicker
              timeSlotSizeMinutes={15}
              isLoading={isScheduling}
              isDone={isScheduled}
              err={scheduleErr}
              onConfirm={handleScheduled}
            />
          </Container>

          <Caption>
            Schedule a day and time, and open your console to see the fake
            response logged.
          </Caption>
        </Interactive>

        <SubTitle>Advanced usage</SubTitle>

        <SubTitle level={2}>Using the time slot validator</SubTitle>

        <p>
          You can pass a validator function as the{' '}
          <InlineCode>timeSlotValidator</InlineCode> prop, to determine if a
          time slot can be picked by the user or not.
        </p>

        <p>
          The validator function is called by the{' '}
          <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode> when it renders
          the time slots in the calendar view. The validator is called with a{' '}
          <InlineCode>Date</InlineCode> Object, which represents a time slot in
          a picked day. And it will be called for every available time slot
          (depending on the size of the{' '}
          <InlineCode>timeSlotSizeMinutes</InlineCode> prop).
        </p>

        <p>
          The validator function should return <InlineCode>true</InlineCode> if
          the time slot is considered &quot;valid&quot;, and the user should be
          able to pick it. And <InlineCode>false</InlineCode> if the time slot
          is considered &quot;invalid&quot;, and the user should <i>not</i> be
          able to pick it.
        </p>

        <p>
          For example, if you want the user to only be able to pick time slots
          in the evening, you can provide:
        </p>

        <CodeBlock codeString={codeExample7} lang="jsx" />

        <Interactive>
          <Container>
            <h3>Pick a Day and Time</h3>

            {/* deliveryDate: "2021-09-23T08:00:00.000+02:00"
            endHour: "12:00"
            rank: ""
            slotCode: ""
            slotStatus: "O"
            startHour: "08:00"
            tariffLevel: "" */}
            <DayTimePicker
              slots={slots}
              timeSlotSizeMinutes={240}
              value={{
                deliveryDate: '2021-09-25T18:00:00.000+02:00',
                endHour: '21',
                rank: '1',
                slotCode: '6212',
                slotStatus: 'O',
                startHour: '19',
                tariffLevel: 'N1'
              }}
              timeSlotValidator={timeSlotValidator}
            />
          </Container>

          <Caption>Only time slots in the evening can be picked.</Caption>
        </Interactive>

        <SubTitle level={2}>Theming</SubTitle>

        <p>
          You can pass a theme Object as the <InlineCode>theme</InlineCode>{' '}
          prop, to customize the look of the{' '}
          <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode> component.
        </p>

        <p>
          The theme Object may contain one or more of the following properties:
        </p>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TH>Name</TH>
                <TH>Type</TH>
                <TH>Default</TH>
                <TH>Description</TH>
              </tr>
            </thead>

            <tbody>
              <tr>
                <TD alignLeft>
                  <InlineCode>primary</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>#3a9ad9</TD>
                <TD alignLeft>
                  The color of the current day- and hover highlights.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>secondary</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>#f0f0f0</TD>
                <TD alignLeft>
                  The background color of the month navigation buttons, and
                  color of borders.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>background</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>#fff</TD>
                <TD alignLeft>
                  The main background color. Note that this should match the
                  background color of the component wrapping the{' '}
                  <InlineCode>&#60;DayTimePicker&#47;&#62;</InlineCode>{' '}
                  component.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>buttons.disabled.color</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>#333</TD>
                <TD alignLeft>The text color of a disabled button.</TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>buttons.disabled.background</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>#dfdfdf</TD>
                <TD alignLeft>The background color of a disabled button.</TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>buttons.confirm.color</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>#fff</TD>
                <TD alignLeft>The color of the confirm (schedule) button.</TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>buttons.confirm.background</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>#3a9ad9</TD>
                <TD alignLeft>
                  The background color of the confirm (schedule) button.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>buttons.confirm.hover.color</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>-</TD>
                <TD alignLeft>
                  The hover color of the confirm (schedule) button.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>buttons.confirm.hover.background</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>#3a9ad9d6</TD>
                <TD alignLeft>
                  The hover background color of the confirm (schedule) button.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>feedback.success.color</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>#29aba4</TD>
                <TD alignLeft>
                  The color of &quot;success&quot; feedback messages.
                </TD>
              </tr>

              <tr>
                <TD alignLeft>
                  <InlineCode>feedback.failed.color</InlineCode>
                </TD>
                <TD>String</TD>
                <TD>#eb7260</TD>
                <TD alignLeft>
                  The color of &quot;failed&quot; feedback messages.
                </TD>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <p>
          For example, to use a dark theme, provide the following theme Object:
        </p>

        <CodeBlock codeString={codeExample8} lang="jsx" />

        <Interactive>
          <DarkContainer>
            <h3>Pick a Day and Time</h3>

            <DayTimePicker timeSlotSizeMinutes={15} theme={theme} />
          </DarkContainer>

          <Caption>
            Note that properties like text color are inherited from the wrapping
            component.
          </Caption>
        </Interactive>
      </Article>

      <Footer>
        Built with 💚 by{' '}
        <a
          href="https://github.com/mooncake-dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mooncake
        </a>
      </Footer>
    </Main>
  );
}

const target = document.getElementById('root');
render(<App />, target);
