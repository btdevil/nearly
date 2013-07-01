<%@page session="false" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/libs/foundation/global.jsp"%>
<%@page import="com.day.cq.wcm.api.WCMMode"%>
<cq:setContentBundle />
<body>
<cq:include script="header.jsp" />
		<cq:include script="centre.jsp" />
		<cq:include script="footer.jsp" />
	</div>
	<!-- END: .main-wrapper -->
	<ne:writeJScripts />

	<%
		//include custom widgets for authoring dialogs only in non-publish mode
		if (WCMMode.fromRequest(request) != WCMMode.DISABLED) {
	%>
		<cq:includeClientLib categories="apps.nearly-demo.widgets" />
	<%
		}
	%>
	<cq:include script="scripts_bottom.jsp"/>
</body>