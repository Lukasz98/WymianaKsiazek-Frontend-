import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'other',
        short_label: 'O',
        name: 'Other',
        type: 'sub',
        icon: 'icon-list',
        children: [
          {
            state: 'simple-page',
            short_label: 'S',
            name: 'sSample Page',
            type: 'link',
            icon: 'icon-watch'
          },
          {
            state: '',
            short_label: 'M',
            name: 'Menu Levels',
            type: 'sub',
            icon: 'icon-list',
            children: [
              {
                state: '',
                name: 'Menu Level 2.1',
                target: true
              }, {
                state: '',
                name: 'Menu Level 2.2',
                type: 'sub',
                children: [
                  {
                    state: '',
                    name: 'Menu Level 2.2.1',
                    target: true
                  },
                  {
                    state: '',
                    name: 'Menu Level 2.2.2',
                    target: true
                  }
                ]
              }, {
                state: '',
                name: 'Menu Level 2.3',
                target: true
              }, {
                state: '',
                name: 'Menu Level 2.4',
                type: 'sub',
                children: [
                  {
                    state: '',
                    name: 'Menu Level 2.4.1',
                    target: true
                  },
                  {
                    state: '',
                    name: 'Menu Level 2.4.2',
                    target: true
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];


@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
