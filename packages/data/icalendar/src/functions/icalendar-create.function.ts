import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import ical, { ICalCalendarMethod } from 'ical-generator'

export const ICalendarCreateInput = z.object({
  name: z.string().optional().describe('Calendar name'),
  method: z.enum(['PUBLISH', 'REQUEST', 'REPLY', 'CANCEL']).optional().describe('Calendar method'),
  events: z.array(z.object({
    summary: z.string().describe('Event title'),
    start: z.string().describe('Start date/time (ISO 8601)'),
    end: z.string().optional().describe('End date/time (ISO 8601)'),
    description: z.string().optional().describe('Event description'),
    location: z.string().optional().describe('Event location'),
    url: z.string().optional().describe('Event URL'),
    allDay: z.boolean().optional().describe('All-day event'),
    organizer: z.object({
      name: z.string(),
      email: z.string(),
    }).optional().describe('Event organizer'),
    attendees: z.array(z.object({
      name: z.string().optional(),
      email: z.string(),
    })).optional().describe('Event attendees'),
  })).describe('Events to include'),
})

export const ICalendarCreateOutput = z.object({
  ics: z.string().describe('Generated iCalendar (.ics) content'),
  eventCount: z.number().describe('Number of events in the calendar'),
})

export const icalendarCreate = pikkuSessionlessFunc({
  description: 'Generate an iCalendar (.ics) file',
  input: ICalendarCreateInput,
  output: ICalendarCreateOutput,
  node: { displayName: 'Create iCalendar', category: 'Data', type: 'action' },
  func: async (_services, { name, method, events }) => {
    const calendar = ical({ name })
    if (method) {
      calendar.method(ICalCalendarMethod[method])
    }

    for (const event of events) {
      const ev = calendar.createEvent({
        summary: event.summary,
        start: new Date(event.start),
        end: event.end ? new Date(event.end) : undefined,
        description: event.description,
        location: event.location,
        url: event.url,
        allDay: event.allDay,
      })

      if (event.organizer) {
        ev.organizer({ name: event.organizer.name, email: event.organizer.email })
      }

      if (event.attendees) {
        for (const attendee of event.attendees) {
          ev.createAttendee({ name: attendee.name, email: attendee.email })
        }
      }
    }

    return {
      ics: calendar.toString(),
      eventCount: events.length,
    }
  },
})
