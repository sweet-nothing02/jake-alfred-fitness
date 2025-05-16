// /sanity/schemaTypes/testimonial.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'feedback',
      title: 'Feedback',
      type: 'text',
    }),
    defineField(
      {
        name: 'clientImage',
        title: 'Client Image',
        type: 'image',
        options: { hotspot: true }
      }),
  ],
})