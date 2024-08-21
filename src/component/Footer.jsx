import React from 'react'
import { Footer} from "flowbite-react";


export function Footercomponent() {
  return (
    <div>
      <Footer container>
      <Footer.Copyright href="#" by="Designed and Developed by Lalit Chaudhari" year={2022} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
    </div>
  )
}
