import { Component, OnInit, signal } from '@angular/core'
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu'
import { MainComponent } from './pages/main/main.component'
import { NgClass, NgComponentOutlet } from '@angular/common'
import { ButtonsComponent } from './pages/buttons/buttons.component'
import { AlertsComponent } from './pages/alerts/alerts.component'
import { CardComponent } from './pages/card/card.component'
import { FormsComponent } from './pages/forms/forms.component'
import { TypographyComponent } from './pages/typography/typography.component'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { IconsComponent } from './pages/icons/icons.component'
import { SamplePageComponent } from './pages/sample-page/sample-page.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, MainComponent, NgComponentOutlet, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  contentComponent = null
  pageActivated = ''
  isShowSideNav = signal(true)

  ngOnInit() {
    this.onDashboardClicked()
  }

  onDashboardClicked() {
    this.contentComponent = MainComponent
    this.pageActivated = 'Dashboard'
  }

  onButtonsClicked() {
    this.contentComponent = ButtonsComponent
    this.pageActivated = 'Buttons'
  }

  onAlertsClicked() {
    this.contentComponent = AlertsComponent
    this.pageActivated = 'Alerts'
  }

  onCardClicked() {
    this.contentComponent = CardComponent
    this.pageActivated = 'Card'
  }

  onFormsClicked() {
    this.contentComponent = FormsComponent
    this.pageActivated = 'Forms'
  }

  onTypographyClicked() {
    this.contentComponent = TypographyComponent
    this.pageActivated = 'Typography'
  }

  onLoginClick() {
    this.contentComponent = LoginComponent
    this.pageActivated = 'Login'
  }

  onRegisterClicked() {
    this.contentComponent = RegisterComponent
    this.pageActivated = 'Register'
  }

  onIconsClicked() {
    this.contentComponent = IconsComponent
    this.pageActivated = 'Icons'
  }

  onSamplePageClicked() {
    this.contentComponent = SamplePageComponent
    this.pageActivated = 'Sample Page'
  }
}
