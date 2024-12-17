import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatpComponent } from './chatp.component';

describe('ChatpComponent', () => {
  let component: ChatpComponent;
  let fixture: ComponentFixture<ChatpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
