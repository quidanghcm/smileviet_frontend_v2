'use client';

import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/app/components/partials/common/toolbar';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { Plus, Download } from 'lucide-react';

import { NetworkUserTableTeamCrewContent } from '@/app/(protected)/khach-san/gia-dau-vao/content';

export default function NetworkUserTableTeamCrewPage() {
  const { settings } = useSettings();

  return (
    <Fragment>
      {settings?.layout === 'demo1' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                <div className="flex items-center flex-wrap gap-1.5 font-medium">
                  <span className="text-base text-secondary-foreground">
                    Tổng số:
                  </span>
                  <span className="text-base text-foreground font-medium me-2">
                    49,053
                  </span>
                  <span className="text-base text-secondary-foreground">
                    Pro Licenses
                  </span>
                  <span className="text-base text-foreground font-medium">
                    724
                  </span>
                </div>
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <Button variant="outline">
                <Download />
                Excel</Button>

              <Button>
                <Plus />
                Thêm</Button>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}
      <Container>
        <NetworkUserTableTeamCrewContent />
      </Container>
    </Fragment>
  );
}
