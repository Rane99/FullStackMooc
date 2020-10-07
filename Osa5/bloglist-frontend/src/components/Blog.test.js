import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'my title',
    author: 'kalle',
    url: 'www.xfef.com',
    likes: 0

  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('my title')
  expect(component.container).toHaveTextContent('kalle')
  
})

test('clicking the button calls event handler once', async () => {
    
    const blog = {
        title: 'my title',
        author: 'kalle',
        url: 'www.xfef.com',
        likes: 0
    
      }
  
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} viewBlog={mockHandler} />
    )
  
    const button = component.getByText('view')
    fireEvent.click(button)
  
    expect(component.container).toHaveTextContent('www.xfef.com')
    expect(component.container).toHaveTextContent('0')
  })

  test('clicking the like button calls event handler twice', async () => {
    
    const blog = {
        title: 'my title',
        author: 'kalle',
        url: 'www.xfef.com',
        likes: 0
    
      }
  
    const mockHandler = jest.fn()
   
  
    const component = render(
      <Blog blog={blog} viewBlog={mockHandler} likeBlog={mockHandler}  />
    )
  
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })