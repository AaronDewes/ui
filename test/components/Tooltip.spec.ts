import { defineComponent } from 'vue'
import { describe, it, expect } from 'vitest'
import Provider from '../../src/runtime/components/Provider.vue'
import Tooltip, { type TooltipProps } from '../../src/runtime/components/Tooltip.vue'
import ComponentRender from '../component-render'

const TooltipWrapper = defineComponent({
  components: {
    UProvider: Provider,
    UTooltip: Tooltip
  },
  inheritAttrs: false,
  template: '<UProvider><UTooltip v-bind="$attrs"><slot /></UTooltip></UProvider>'
})

describe('Tooltip', () => {
  it.each([
    ['with text', { props: { text: 'Tooltip', open: true }, slots: { default: () => 'Hover me' } }],
    ['with arrow', { props: { text: 'Tooltip', arrow: true, open: true }, slots: { default: () => 'Hover me' } }],
    ['with shortcuts', { props: { text: 'Tooltip', shortcuts: ['⌘', 'K'], open: true }, slots: { default: () => 'Hover me' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: TooltipProps, slots?: any }) => {
    const html = await ComponentRender(nameOrHtml, options, TooltipWrapper)
    expect(html).toMatchSnapshot()
  })
})
