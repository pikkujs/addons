import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupCalendarGetScheduleInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  Schedules: z.array(z.string()).optional(),
  EndTime: z.object({
  dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
  timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
}).optional(),
  StartTime: z.object({
  dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
  timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
}).optional(),
  AvailabilityViewInterval: z.number().min(-2147483648).max(2147483647).nullable().optional(),
})

export const GroupCalendarGetScheduleOutput = z.object({
  value: z.array(z.object({
    availabilityView: z.string().nullable().optional().describe("Represents a merged view of availability of all the items in scheduleItems. The view consists of time slots. Availability during each time slot is indicated with: 0= free or working elswhere, 1= tentative, 2= busy, 3= out of office.Note: Working elsewhere is set to 0 instead of 4 for backward compatibility. For details, see the Q&A and Exchange 2007 and Exchange 2010 do not use the WorkingElsewhere value."),
    error: z.object({
      message: z.string().nullable().optional().describe("Describes the error."),
      responseCode: z.string().nullable().optional().describe("The response code from querying for the availability of the user, distribution list, or resource."),
    }).optional(),
    scheduleId: z.string().nullable().optional().describe("An SMTP address of the user, distribution list, or resource, identifying an instance of scheduleInformation."),
    scheduleItems: z.array(z.object({
      end: z.object({
        dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
        timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
      }).optional(),
      isPrivate: z.boolean().nullable().optional().describe("The sensitivity of the corresponding event. True if the event is marked private, false otherwise. Optional."),
      location: z.string().nullable().optional().describe("The location where the corresponding event is held or attended from. Optional."),
      start: z.object({
        dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
        timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
      }).optional(),
      status: z.enum(["unknown", "free", "tentative", "busy", "oof", "workingElsewhere"]).optional(),
      subject: z.string().nullable().optional().describe("The corresponding event's subject line. Optional."),
    })).optional().describe("Contains the items that describe the availability of the user or resource."),
    workingHours: z.object({
      daysOfWeek: z.array(z.enum(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"])).optional().describe("The days of the week on which the user works."),
      endTime: z.string().regex(new RegExp("^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?$")).nullable().optional().describe("The time of the day that the user stops working."),
      startTime: z.string().regex(new RegExp("^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?$")).nullable().optional().describe("The time of the day that the user starts working."),
      timeZone: z.object({
        name: z.string().nullable().optional().describe("The name of a time zone. It can be a standard time zone name such as 'Hawaii-Aleutian Standard Time', or 'Customized Time Zone' for a custom time zone."),
      }).optional(),
    }).optional(),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const groupCalendarGetSchedule = pikkuSessionlessFunc({
  description: "Get the free/busy availability information for a collection of users, distributions lists, or resources (rooms or equipment) for a specified time period.",
  input: GroupCalendarGetScheduleInput,
  output: GroupCalendarGetScheduleOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/groups/{group-id}/calendar/microsoft.graph.getSchedule", data) as any
  },
})
