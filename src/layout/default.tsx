import { connect } from 'react-redux'
import React from 'react'
import { Layout, Icon, Button } from 'antd'
import GlobalMenu from './components/menu'
import { setVisibilityAsider } from '../actions'
import styles from './default.scss'
const { Header, Content } = Layout
console.log(styles)
class GlobalLayout extends React.Component<any, any> {
  state = {height: 0, width: 0}
    
  toggle = () => {
    const { visibilityAsider, dispatch } = this.props
    dispatch(setVisibilityAsider(!visibilityAsider))
  }

  render() {
    const { visibilityAsider } = this.props
    return (
      <Layout className={styles.sectionLayout}>
        <GlobalMenu data={{collapsed: visibilityAsider}}/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={ visibilityAsider ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            className={styles.globalContent}
            id="content"
            >
            content
            <Button>生成热力图</Button>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
function mapStateToProps(state: { visibilityAsider: any; }) {
  const { visibilityAsider } = state
  return {
    visibilityAsider
  }
}
export default connect(mapStateToProps)(GlobalLayout)