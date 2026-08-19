import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserContactFolderListContactInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserContactFolderListContactOutput = z.object({
  value: z.array(z.object({
    assistantName: z.string().nullable().optional().describe("The name of the contact's assistant."),
    birthday: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The contact's birthday. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z"),
    businessAddress: z.object({
      city: z.string().nullable().optional().describe("The city."),
      countryOrRegion: z.string().nullable().optional().describe("The country or region. It's a free-format string value, for example, 'United States'."),
      postalCode: z.string().nullable().optional().describe("The postal code."),
      state: z.string().nullable().optional().describe("The state."),
      street: z.string().nullable().optional().describe("The street."),
    }).optional(),
    businessHomePage: z.string().nullable().optional().describe("The business home page of the contact."),
    businessPhones: z.array(z.string()).optional().describe("The contact's business phone numbers."),
    children: z.array(z.string()).optional().describe("The names of the contact's children."),
    companyName: z.string().nullable().optional().describe("The name of the contact's company."),
    department: z.string().nullable().optional().describe("The contact's department."),
    displayName: z.string().nullable().optional().describe("The contact's display name. You can specify the display name in a create or update operation. Note that later updates to other properties may cause an automatically generated value to overwrite the displayName value you have specified. To preserve a pre-existing value, always include it as displayName in an update operation."),
    emailAddresses: z.array(z.object({
      address: z.string().nullable().optional().describe("The email address of the person or entity."),
      name: z.string().nullable().optional().describe("The display name of the person or entity."),
    })).optional().describe("The contact's email addresses."),
    fileAs: z.string().nullable().optional().describe("The name the contact is filed under."),
    generation: z.string().nullable().optional().describe("The contact's suffix."),
    givenName: z.string().nullable().optional().describe("The contact's given name."),
    homeAddress: z.object({
      city: z.string().nullable().optional().describe("The city."),
      countryOrRegion: z.string().nullable().optional().describe("The country or region. It's a free-format string value, for example, 'United States'."),
      postalCode: z.string().nullable().optional().describe("The postal code."),
      state: z.string().nullable().optional().describe("The state."),
      street: z.string().nullable().optional().describe("The street."),
    }).optional(),
    homePhones: z.array(z.string()).optional().describe("The contact's home phone numbers."),
    imAddresses: z.array(z.string()).optional().describe("The contact's instant messaging (IM) addresses."),
    initials: z.string().nullable().optional().describe("The contact's initials."),
    jobTitle: z.string().nullable().optional().describe("The contact’s job title."),
    manager: z.string().nullable().optional().describe("The name of the contact's manager."),
    middleName: z.string().nullable().optional().describe("The contact's middle name."),
    mobilePhone: z.string().nullable().optional().describe("The contact's mobile phone number."),
    nickName: z.string().nullable().optional().describe("The contact's nickname."),
    officeLocation: z.string().nullable().optional().describe("The location of the contact's office."),
    otherAddress: z.object({
      city: z.string().nullable().optional().describe("The city."),
      countryOrRegion: z.string().nullable().optional().describe("The country or region. It's a free-format string value, for example, 'United States'."),
      postalCode: z.string().nullable().optional().describe("The postal code."),
      state: z.string().nullable().optional().describe("The state."),
      street: z.string().nullable().optional().describe("The street."),
    }).optional(),
    parentFolderId: z.string().nullable().optional().describe("The ID of the contact's parent folder."),
    personalNotes: z.string().nullable().optional().describe("The user's notes about the contact."),
    primaryEmailAddress: z.object({
      address: z.string().nullable().optional().describe("The email address of the person or entity."),
      name: z.string().nullable().optional().describe("The display name of the person or entity."),
    }).optional(),
    profession: z.string().nullable().optional().describe("The contact's profession."),
    secondaryEmailAddress: z.object({
      address: z.string().nullable().optional().describe("The email address of the person or entity."),
      name: z.string().nullable().optional().describe("The display name of the person or entity."),
    }).optional(),
    spouseName: z.string().nullable().optional().describe("The name of the contact's spouse/partner."),
    surname: z.string().nullable().optional().describe("The contact's surname."),
    tertiaryEmailAddress: z.object({
      address: z.string().nullable().optional().describe("The email address of the person or entity."),
      name: z.string().nullable().optional().describe("The display name of the person or entity."),
    }).optional(),
    title: z.string().nullable().optional().describe("The contact's title."),
    yomiCompanyName: z.string().nullable().optional().describe("The phonetic Japanese company name of the contact."),
    yomiGivenName: z.string().nullable().optional().describe("The phonetic Japanese given name (first name) of the contact."),
    yomiSurname: z.string().nullable().optional().describe("The phonetic Japanese surname (last name)  of the contact."),
    extensions: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    })).optional().describe("The collection of open extensions defined for the contact. Read-only. Nullable."),
    multiValueExtendedProperties: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      value: z.array(z.string()).optional().describe("A collection of property values."),
    })).optional().describe("The collection of multi-value extended properties defined for the contact. Read-only. Nullable."),
    photo: z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      height: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The height of the photo. Read-only."),
      width: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The width of the photo. Read-only."),
    }).optional(),
    singleValueExtendedProperties: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      value: z.string().nullable().optional().describe("A property value."),
    })).optional().describe("The collection of single-value extended properties defined for the contact. Read-only. Nullable."),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const userContactFolderListContact = pikkuSessionlessFunc({
  description: "The contacts in the folder. Navigation property. Read-only. Nullable.",
  input: UserContactFolderListContactInput,
  output: UserContactFolderListContactOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/contactFolders/{contactFolder-id}/contacts", data) as any
  },
})
