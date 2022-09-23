import { render } from '@testing-library/react'
import Home from '@/pages/index'
import Dashboard from '@/pages/admin'

it('renders homepage unchanged', () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})

it('renders admin unchanged', () => {
  const { container } = render(<Dashboard />)
  expect(container).toMatchSnapshot()
})

