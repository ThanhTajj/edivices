import React from 'react'
import { Row, Col } from 'antd'
import {
  WrapperFooter,
  WrapperFooterContent,
  FooterTitle,
  FooterText,
  FooterBottom
} from './style'

const FooterComponent = () => {
  return (
    <WrapperFooter>
      <WrapperFooterContent>
        <Row gutter={[32, 32]}>
          <Col span={6}>
            <FooterTitle>Edivices</FooterTitle>
            <FooterText>
              Hệ thống bán thiết bị điện tử chính hãng, 
              cam kết chất lượng và dịch vụ tốt nhất.
            </FooterText>
          </Col>
          <Col span={6}>
            <FooterTitle>Chính sách</FooterTitle>
            <FooterText>Chính sách bảo hành</FooterText>
            <FooterText>Chính sách đổi trả</FooterText>
            <FooterText>Chính sách vận chuyển</FooterText>
          </Col>
          <Col span={6}>
            <FooterTitle>Hỗ trợ</FooterTitle>
            <FooterText>Hướng dẫn mua hàng</FooterText>
            <FooterText>Thanh toán</FooterText>
            <FooterText>Câu hỏi thường gặp</FooterText>
          </Col>
          <Col span={6}>
            <FooterTitle>Liên hệ</FooterTitle>
            <FooterText>Email: support@edivices.vn</FooterText>
            <FooterText>Hotline: 1900 1900</FooterText>
            <FooterText>Địa chỉ: Hà Nội, Việt Nam</FooterText>
          </Col>
        </Row>
      </WrapperFooterContent>
      <FooterBottom>
        © {new Date().getFullYear()} Edivices. All rights reserved.
      </FooterBottom>
    </WrapperFooter>
  )
}

export default FooterComponent